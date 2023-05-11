import { courseGateway } from '@/gateway/courses.gateway';
import { computed, onMounted, ref } from 'vue';
import { ICourse } from '@/types/ICourse.types';
import { MAX_ITEMS_PER_PAGE } from '@/constants';

export const useLocalPagination = () => {
  const page = ref(1);
  const courses = ref<ICourse.ShortPreview[]>([])

  const paginatedCourses = computed(() => {
    return courses.value.slice(
      (page.value - 1) * MAX_ITEMS_PER_PAGE,
      page.value * MAX_ITEMS_PER_PAGE,
    );
  })

  const totalItems = computed(() => courses.value.length)

  const setPage = (newValue: number) => {
    page.value = newValue;
  }

  onMounted(async () => {
    const data = await courseGateway.getCourses();

    if (data.isSuccess) {
      courses.value = data.response.courses
    }
  })

  return {
    page,
    paginatedCourses,
    totalItems,
    setPage,
    MAX_ITEMS_PER_PAGE
  }
}
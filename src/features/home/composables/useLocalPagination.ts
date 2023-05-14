import { courseGateway } from '@/shared/gateway/courses.gateway';
import { computed, onMounted, ref } from 'vue';
import { ICourse } from '@/features/home/types/ICourse.types';
import { MAX_ITEMS_PER_PAGE } from '@/shared/constants';

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

  const totalPages = computed(() => Math.ceil(courses.value.length / MAX_ITEMS_PER_PAGE))

  const setPage = (newValue: number) => {
    page.value = newValue;
  }

  const fetchCourses = () => {
    courseGateway.getCourses().then((data) => {
      if (data.isSuccess) {
        courses.value = data.response.courses
      }
    })
  }

  onMounted(fetchCourses)

  return {
    page,
    paginatedCourses,
    totalItems,
    totalPages,
    setPage,
  }
}
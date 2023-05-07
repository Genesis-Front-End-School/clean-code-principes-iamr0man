<template>
  <Container class="flex flex-col justify-center items-center">
    <div
      class="grid grid-cols-3 gap-y-12 gap-x-12 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-x-0">
      <CourseItem
        v-for="course in paginatedCourses"
        :key="course.id"
        :course="course" />
    </div>
    <ThePagination
      v-model="page"
      class="mt-2"
      :per-page="MAX_ITEMS_PER_PAGE"
      :total-items="courses.length"
      :slice-length="2" />
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CourseItem from '@/components/pages/home/CourseItem.vue';
import Container from '@/components/ui/Container.vue';
import { api } from '@/api/api';
import ThePagination from '@/components/ui/ThePagination/ThePagination.vue';

const MAX_ITEMS_PER_PAGE = 3;

export default defineComponent({
  components: { ThePagination, Container, CourseItem },
  async setup() {
    const data = await api.getCourses();

    if (data.isSuccess) {
      return {
        MAX_ITEMS_PER_PAGE,
        courses: data.response.courses,
      }
    }

    return {
      MAX_ITEMS_PER_PAGE,
      courses: [],
    };
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    paginatedCourses() {
      return this.courses.slice(
        (this.page - 1) * MAX_ITEMS_PER_PAGE,
        this.page * MAX_ITEMS_PER_PAGE,
      );
    },
  },
});
</script>

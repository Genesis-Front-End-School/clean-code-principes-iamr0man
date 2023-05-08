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
      class="mt-2"
      v-model="page"
      :per-page="3"
      :total-items="courses.length"
      :slice-length="2" />
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CourseItem from '@/components/courses/CourseItem.vue';
import Container from '@/components/ui/Container.vue';
import ThePagination from '@/components/ui/ThePagination/ThePagination.vue';
import { courseGateway } from '@/gateway/courses.gateway';

const MAX_ITEM_PER_LOAD = 3;

export default defineComponent({
  components: { ThePagination, Container, CourseItem },
  async setup() {
    const data = await courseGateway.getCourses();

    if (data.isSuccess) {
      return data.response;
    }

    return {
      courses: [],
    };
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    paginatedCourses() {
      return this.courses.slice(
        (this.page - 1) * MAX_ITEM_PER_LOAD,
        this.page * MAX_ITEM_PER_LOAD,
      );
    },
  },
});
</script>

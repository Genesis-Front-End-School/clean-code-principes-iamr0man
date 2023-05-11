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
      :total-items="totalItems"
      :slice-length="2"
      @update:model-value="setPage"
    />
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CourseItem from '@/components/pages/home/CourseItem.vue';
import Container from '@/components/ui/Container.vue';
import ThePagination from '@/components/ui/ThePagination/ThePagination.vue';
import { useLocalPagination } from '@/composables/useLocalPagination';
import { MAX_ITEMS_PER_PAGE } from '@/constants';

export default defineComponent({
  components: { ThePagination, Container, CourseItem },
  async setup() {
    return {
      ...useLocalPagination(),
      MAX_ITEMS_PER_PAGE,
    }
  },
});
</script>

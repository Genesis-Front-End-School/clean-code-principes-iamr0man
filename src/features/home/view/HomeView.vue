<template>
  <Container class="flex flex-col justify-center items-center">
    <Loader v-if="loading" />
    <div v-else class="flex flex-col items-center">
      <div
        class="grid grid-cols-3 gap-y-12 gap-x-12 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-x-0">
        <CourseItem
          v-for="course in paginatedCourses"
          :key="course.id"
          :course="course" />
      </div>
      <ThePagination
        v-model="page"
        class="mt-5"
        :per-page="MAX_ITEMS_PER_PAGE"
        :total-items="totalItems"
        :total-pages="totalPages"
        :slice-length="SLICE_LENGTH"
        @update:model-value="setPage"
      />
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CourseItem from '@/features/home/components/CourseItem.vue';
import { Container, Loader, ThePagination} from 'udewi-ui';
import { useLocalPagination } from '@/features/home/composables/useLocalPagination';
import { MAX_ITEMS_PER_PAGE, SLICE_LENGTH } from '@/shared/constants';

export default defineComponent({
  components: { Loader, ThePagination, Container, CourseItem },
  setup() {
    return {
      ...useLocalPagination(),
      MAX_ITEMS_PER_PAGE,
      SLICE_LENGTH,
    }
  },
});
</script>

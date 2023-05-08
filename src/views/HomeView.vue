<template>
  <Container class="flex flex-col justify-center items-center">
    <div
      class="grid grid-cols-3 gap-y-12 gap-x-12 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-x-0"
    >
      <CourseItem
        v-for="course in paginatedCourses"
        :key="course.id"
        :course="course"
      />
    </div>
    <button
      v-if="!loadDisabled"
      type="button"
      class="mt-4 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      @click="incrementPage"
    >
      Load more
    </button>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CourseItem from '@/components/courses/CourseItem.vue';
import Container from '@/components/ui/Container.vue';
import { api } from "@/api/api";

const MAX_ITEM_PER_LOAD = 6;

export default defineComponent({
  components: { Container, CourseItem },
  async setup() {
    const data = await api.getCourses();

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
      return this.courses.slice(0, this.page * MAX_ITEM_PER_LOAD);
    },
    loadDisabled() {
      return this.paginatedCourses.length === this.courses.length;
    },
  },
  methods: {
    incrementPage() {
      this.page += 1;
    },
  },
});
</script>

<template>
  <RouterLink
    :id="course.id"
    :to="course.id"
    class="border bg-opacity-50 rounded-lg shadow dark:border-gray-700"
  >
    <VideoPlayerPreview :course="course" />
    <div class="flex h-[60%] flex-col items-start justify-between p-5">
      <div>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ course.title }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ course.description }}
        </p>
        <div class="flex justify-between">
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.lessonsCount }} lessons
          </p>
          <p class="flex mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.rating }}
            <IconStar />
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ course.tags.join(', ') }}
          </p>
        </div>
      </div>
      <button
        class="flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <IconArrow />
      </button>
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { IconArrow, IconStar } from 'udewi-ui';
import type { ICourse } from '@/features/home/types/ICourse.types';
import VideoPlayerPreview from '@/features/home/components/VideoPlayerPreview.vue';

export default defineComponent({
  name: 'CourseItem',
  components: { VideoPlayerPreview, IconStar, IconArrow },
  props: {
    course: {
      type: Object as PropType<ICourse.ShortPreview>,
      required: true,
    },
  },
});
</script>

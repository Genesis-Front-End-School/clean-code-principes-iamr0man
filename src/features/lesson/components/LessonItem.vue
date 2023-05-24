<template>
  <li
    :class="{ 'dark:bg-gray-500': selected }"
    class="px-1 py-2.5 flex justify-between items-center text-gray-900 border-b cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 last:border-b-0"
  >
    <p class="text-lg basis-5/6">
      <span class="font-bold">{{ lesson.order }}.</span> {{ lesson.title }}
    </p>
    <span class="text-sm basis-1/6 text-end">{{ duration }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { ICourse } from '@/features/course/types/ICourse.types';
import { formatDuration } from '@/features/lesson/utils/formatDuration';

export default defineComponent({
  name: 'LessonItem',
  props: {
    lesson: {
      type: Object as PropType<ICourse.Lesson>,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    duration() {
      return this.formatDuration(this.lesson.duration);
    },
  },
  methods: {
    formatDuration,
  },
});
</script>

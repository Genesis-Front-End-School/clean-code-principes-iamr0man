<template>
  <li
    :class="{ 'dark:bg-gray-500': selected }"
    class="px-1 py-2.5 flex justify-between items-center border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 last:border-b-0"
  >
    <p class="text-white text-lg basis-5/6">
      <span class="font-bold">{{ lesson.order }}.</span> {{ lesson.title }}
    </p>
    <span class="text-white text-sm basis-1/6 text-end">{{ duration }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { ICourse } from "@/types/ICourse.types";
import { formatDuration } from "@/utils/formatDuration";

export default defineComponent({
  name: "LessonItem",
  props: {
    lesson: {
      type: Object as PropType<ICourse.Lesson>,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    duration () {
      return this.formatDuration(this.lesson.duration)
    }
  },
  methods: {
    formatDuration
  }
})
</script>

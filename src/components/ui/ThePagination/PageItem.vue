<template>
  <button
    :disabled="disabled"
    class="w-12 py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    :class="dynamicClasses"
    @click="emitPage">
    {{ index }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageItem',
  props: {
    index: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    disabled(): boolean {
      return this.index === this.currentPage;
    },
    dynamicClasses() {
      return {
        'text-blue-600 dark:text-white bg-blue-50 dark:bg-gray-700':
          this.disabled,
      };
    },
  },
  methods: {
    emitPage() {
      this.$emit('setPage', this.index);
    },
  },
});
</script>

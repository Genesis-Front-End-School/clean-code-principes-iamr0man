<template>
  <span
    :class="dynamicClasses"
    class="text-xs text-center font-medium mr-2 px-2.5 py-0.5 rounded"
  >
    {{ name }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    dynamicClasses() {
      switch (this.index) {
        case 0:
        case 5:
          return 'bg-green-100 text-green-800';
        case 1:
        case 6:
          return 'bg-yellow-100 text-yellow-800';
        case 2:
        case 7:
          return 'bg-red-100 text-red-800';
        case 3:
        case 8:
          return 'bg-orange-100 text-orange-800';
        case 4:
        case 9:
          return 'bg-blue-100 text-blue-800';
      }
    },
  },
});
</script>

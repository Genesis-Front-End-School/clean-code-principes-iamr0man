<template>
  <div>
    <NotFound v-if="error" />
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotFound from '@/shared/components/ui/error/NotFound.vue';

export default defineComponent({
  name: 'ErrorBoundary',
  components: {
    NotFound,
  },
  data: () => ({
    error: false,
  }),
  errorCaptured() {
    this.error = true;
  },
});
</script>

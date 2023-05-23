<template>
  <div class="flex flex-col items-center">
    <NotFound v-if="error" />
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NotFound } from 'udewi-ui';

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

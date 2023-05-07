<template>
  <div>
    <Suspense>
      <template #default>
        <RouterView v-slot="{ Component }">
          <ErrorBoundary>
            <transition name="scale">
              <component :is="Component" />
            </transition>
          </ErrorBoundary>
        </RouterView>
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import ErrorBoundary from '@/components/ui/error/ErrorBoundary.vue';

export default defineComponent({
  components: {
    RouterView,
    ErrorBoundary,
  },
});
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

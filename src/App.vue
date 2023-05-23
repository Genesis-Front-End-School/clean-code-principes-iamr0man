<template>
  <Suspense>
    <template #default>
      <RouterView v-slot="{ Component }">
        <ErrorBoundary>
          <ThemeButton />
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
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import { ErrorBoundary, ThemeButton } from 'udewi-ui';

export default defineComponent({
  components: {
    ThemeButton,
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

<template>
  <div
    class="max-w-[1400px] mx-auto p-12 relative h-full w-full laptop:max-w-[1200px] tablet:max-w-[1000px] mobile:p-4 mobile:max-w-full"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

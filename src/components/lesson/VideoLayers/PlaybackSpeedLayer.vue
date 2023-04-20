<template>
  <div
    :class="dynamicClasses"
    class="flex flex-col absolute bg-black top-0 left-0 w-full h-full flex items-center justify-center rounded-lg transition-opacity duration-300 ease-linear"
  >
    <p class="text-3xl font-light">{{ speed }}</p>
  </div>
</template>

<script>
import IconPlus from '@/components/icons/IconPlus.vue';
export default {
  name: 'PlaybackSpeedLayer',
  components: { IconPlus },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
  },
  computed: {
    dynamicClasses() {
      return {
        'visible opacity-100 z-20': this.show,
        'invisible opacity-0 -z-1': !this.show,
      };
    },
  },
};
</script>

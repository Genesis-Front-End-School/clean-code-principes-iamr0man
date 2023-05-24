<template>
  <div>
    <video
      id="selected-video"
      ref="activeVideo"
      :class="videoClasses"
      class="absolute min-w-[373px] max-h-[163px]"
      playsinline
      type="application/x-mpegURL"
      muted
      @mouseleave="stopVideo"
      @mouseenter="playVideo"
    />
    <img
      :class="imagePreviewClasses"
      :src="previewImageLink"
      :alt="course.title"
      class="rounded-t-lg h-[163px] object-contain mx-auto"
    >
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import Hls from 'hls.js';
import type { ICourse } from '@/features/home/types/ICourse.types';

export default defineComponent({
  props: {
    course: {
      type: Object as PropType<ICourse.ShortPreview>,
      required: true,
    },
  },
  emits: ['paused'],
  setup() {
    const activeVideo = ref<HTMLMediaElement | null>(null);

    return {
      activeVideo,
    };
  },
  data: () => ({
    hls: new Hls(),
    paused: true,
  }),
  computed: {
    isAvailable() {
      return (
        this.course.meta.courseVideoPreview
        && this.course.meta.courseVideoPreview.duration > 0
      );
    },
    previewImageLink() {
      return `${this.course.previewImageLink}/cover.webp`;
    },
    videoClasses() {
      return { 'z-10': !this.paused };
    },
    imagePreviewClasses() {
      return { 'opacity-0': !this.paused };
    },
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    playVideo() {
      if (!this.isAvailable) {
        return;
      }

      if (!this.activeVideo) {
        return;
      }

      this.paused = false;

      const linkOriginal = this.course.meta.courseVideoPreview.link;

      if (Hls.isSupported()) {
        this.hls.loadSource(linkOriginal);
        this.hls.attachMedia(this.activeVideo);
      }

      const playPromise = this.activeVideo.play();
      if (playPromise !== undefined) {
        playPromise.then({}).catch({});
      }
    },
    stopVideo() {
      if (!this.activeVideo) {
        return;
      }

      this.activeVideo.pause();
      this.activeVideo.currentTime = 0;

      this.paused = true;
    },
  },
});
</script>

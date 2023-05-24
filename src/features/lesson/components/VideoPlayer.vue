<template>
  <div>
    <video
      id="selected-video"
      ref="selectedVideo"
      class="w-full max-w-full z-10"
      :poster="posterPreviewLink"
      playsinline
      controls
      :tabindex="tabbingIndex"
      @keydown="changeVideoSpeed"
    />
    <slot
      :speed-changed="speedChanged"
      :speed="speed"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import Hls from 'hls.js';
import type { ICourse } from '@/features/course/types/ICourse.types';
import {
  ArrowDownKey, ArrowUpKey, DURATION_TIME_KEY, MAX_RATE, MIN_RATE,
} from '@/shared/constants';

export default defineComponent({
  props: {
    isAvailable: {
      type: Boolean,
      required: true,
    },
    currentLesson: {
      type: Object as PropType<ICourse.Lesson>,
      required: true,
    },
  },
  emits: ['notFound', 'paused'],
  setup() {
    const selectedVideo = ref<HTMLMediaElement | null>(null);

    return {
      selectedVideo,
    };
  },
  data: () => ({
    hls: new Hls(),
    speed: 1,
    speedChanged: false,
  }),
  computed: {
    posterPreviewLink(): string {
      return `${this.currentLesson.previewImageLink}/lesson-${this.currentLesson.order}.webp`;
    },
    tabbingIndex(): number {
      return !this.isAvailable ? -1 : 0;
    },
  },
  watch: {
    currentLesson() {
      this.loadHlsPlayer();
    },
    speed(newValue: number) {
      this.speedChanged = true;

      const video = this.selectedVideo as HTMLMediaElement;
      video.playbackRate = newValue;

      setTimeout(() => { this.speedChanged = false; }, 400);
    },
  },
  mounted() {
    this.loadHlsPlayer();
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    checkCurrentTime(): number {
      const lastSecond = localStorage.getItem(
        this.currentLesson.id + DURATION_TIME_KEY,
      );
      if (lastSecond) {
        return Number(lastSecond);
      }

      return 0;
    },
    changeVideoSpeed(event: KeyboardEvent) {
      if (this.speed <= MIN_RATE || this.speed >= MAX_RATE) {
        return;
      }
      switch (event.key) {
        case ArrowUpKey:
          this.speed += MIN_RATE;
          break;
        case ArrowDownKey:
          this.speed -= MIN_RATE;
          break;
        default:
          break;
      }
    },
    loadHlsPlayer() {
      const video = this.selectedVideo as HTMLMediaElement;

      this.initVideoListener(video);

      if (!this.isAvailable) {
        this.resetVideoPlayer();
        return;
      }

      try {
        if (Hls.isSupported()) {
          this.setHlsSourceAndListener(video);
          return;
        }
      } catch (err) {
        this.$emit('notFound', true);
      }
    },
    initVideoListener(video: HTMLMediaElement) {
      video.addEventListener('timeupdate', () => {
        const currentTime = JSON.stringify(video.currentTime);
        if (!Number(currentTime)) {
          return;
        }
        localStorage.setItem(
          this.currentLesson.id + DURATION_TIME_KEY,
          currentTime,
        );
      });
    },
    resetVideoPlayer() {
      this.hls.destroy();
      this.hls = new Hls();
    },
    setHlsSourceAndListener(video: HTMLMediaElement) {
      this.hls.loadSource(this.currentLesson.link);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = this.checkCurrentTime();
      });
    },
  },
});
</script>

<template>
  <div class="PageLesson min-h-screen">
    <div class="relative flex flex-col flex-1 h-full">
      <div class="flex py-12 gap-x-8 tablet:flex-col">
        <div class="basis-8/12 bg-blue-1100 tablet:mb-4">
          <div
            class="relative block min-h-[540px] bg-white border border-gray-200 rounded-lg shadow tablet:min-h-[200px] dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4">
              <video
                id="selected-video"
                ref="selectedVideo"
                class="w-full max-w-full z-10"
                :poster="posterPreviewLink"
                playsinline
                controls
                :tabindex="tabbingIndex"
                @keydown="changeVideoSpeed" />
              <div class="mt-2 flex justify-between items-center">
                <p class="basis-4/6 mt-1 mobile:hidden">
                  To change the speed of a video using the keyboard, you can use
                  the "Arrow Up" key to increase the speed and the "Arrow Down"
                  key to decrease it.
                </p>
                <button
                  type="button"
                  class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="togglePictureInPicture">
                  Toggle picture-in-picture
                </button>
              </div>
            </div>
            <LockedLayer v-if="!unlocked" />
            <NotFoundLayer v-if="notFound" />
            <PlaybackSpeedLayer :show="speedChanged" :speed="speed" />
          </div>
        </div>
        <ul
          class="max-h-[540px] text-scroll overflow-y-scroll basis-4/12 p-4 block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <LessonItem
            v-for="lesson in lessons"
            :key="lesson.order"
            :lesson="lesson"
            :selected="lesson.order === lessonNumber"
            @click="lessonNumber = lesson.order" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import type { ICourse } from '@/types/ICourse.types';
import LessonItem from '@/components/pages/course/lesson/LessonItem.vue';
import Hls from 'hls.js'; 
import NotFoundLayer from '@/components/pages/course/lesson/VideoLayers/NotFoundLayer.vue';
import LockedLayer from '@/components/pages/course/lesson/VideoLayers/LockedLayer.vue';
import PlaybackSpeedLayer from '@/components/pages/course/lesson/VideoLayers/PlaybackSpeedLayer.vue';

export const DURATION_TIME_KEY = '--duration-time';

export const ArrowUpKey = 'ArrowUp';
export const ArrowDownKey = 'ArrowDown';

export const MIN_RATE = 0.25;
export const MAX_RATE = 5;

export default defineComponent({
  components: {
    PlaybackSpeedLayer,
    LockedLayer,
    NotFoundLayer,
    LessonItem,
  },
  props: {
    course: {
      type: Object as PropType<ICourse.Item>,
      required: true,
    },
  },
  setup() {
    const selectedVideo = ref<HTMLMediaElement | null>(null)

    return {
      selectedVideo,
    }
  },
  data: () => ({
    hls: new Hls(),
    lessonNumber: 1,
    notFound: false,
    speed: 1,
    speedChanged: false,
  }),
  computed: {
    isAvailable(): boolean {
      return this.unlocked || !this.notFound;
    },
    lessons(): ICourse.Lesson[] {
      const lessonCopy = [...this.course.lessons];
      return lessonCopy.sort((a, b) => a.order - b.order);
    },
    currentLesson(): ICourse.Lesson {
      return this.lessons[Number(this.lessonNumber) - 1];
    },
    posterPreviewLink(): string {
      return `${this.currentLesson.previewImageLink}/lesson-${this.currentLesson.order}.webp`;
    },
    unlocked(): boolean {
      return this.currentLesson.status === 'unlocked';
    },
    courseLessonKey(): string {
      return `${this.course.id}-selected-lesson`;
    },
    tabbingIndex(): number {
      return !this.isAvailable ? -1 : 0;
    },
  },
  watch: {
    currentLesson() {
      this.loadHlsPlayer();
    },
    lessonNumber(newValue: number) {
      this.setSelectedLocal(newValue);
    },
    speed(newValue: number) {
      this.speedChanged = true;

      const video = this.selectedVideo as HTMLMediaElement;
      video.playbackRate = newValue;

      setTimeout(() => (this.speedChanged = false), 400);
    },
  },
  mounted() {
    this.initSelectedLesson();
    this.loadHlsPlayer();
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    togglePictureInPicture() {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        const video = this.selectedVideo as HTMLVideoElement;
        video.requestPictureInPicture();
      }
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
    initSelectedLesson() {
      this.lessonNumber =
        Number(window.localStorage.getItem(this.courseLessonKey)) || 1;
    },
    setSelectedLocal(order: number) {
      window.localStorage.setItem(this.courseLessonKey, order.toString());
    },
    checkCurrentTime(): number {
      const lastSecond = localStorage.getItem(
        this.currentLesson.id + DURATION_TIME_KEY,
      );
      if (lastSecond) {
        return Number(lastSecond);
      }

      return 0;
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
        this.notFound = true;
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

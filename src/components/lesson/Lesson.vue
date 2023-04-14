<template>
  <div class="PageLesson min-h-screen">
    <div class="relative flex flex-col flex-1 h-full">
      <div class="flex py-12 gap-x-8 tablet:flex-col">
        <div class="basis-8/12 bg-blue-1100 tablet:mb-4">
          <div class="relative block min-h-[540px] bg-white border border-gray-200 rounded-lg shadow tablet:min-h-[200px] dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4">
              <video
                :ref="videoRefName"
                id="selected-video"
                class="w-full max-w-full z-10"
                :poster="posterPreviewLink"
                playsinline
                controls
                :tabindex="tabbingIndex"
                @keydown="changeVideoSpeed"
              />
              <div class="mt-2 flex justify-between items-center">
                <p class="basis-4/6 mt-1 mobile:hidden">
                  To change the speed of a video using the keyboard, you can use the "Arrow Up" key to increase the speed and the "Arrow Down" key to decrease it.
                </p>
                <button
                  type="button"
                  class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="togglePictureInPicture"
                >
                  Toggle picture-in-picture
                </button>
              </div>
            </div>
            <LockedLayer v-if="!unlocked" />
            <NotFoundLayer v-if="notFound" />
            <PlaybackSpeedLayer
              :show="speedChanged"
              :speed="speed"
            />
          </div>
        </div>
        <ul class="max-h-[540px] text-scroll overflow-y-scroll basis-4/12 p-4 block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <LessonItem
            v-for="lesson in lessons"
            :key="lesson.order"
            :lesson="lesson"
            :selected="lesson.order === lessonNumber"
            @click="lessonNumber = lesson.order"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue';
import Container from '@/components/ui/Container.vue';
import type { ICourse } from "@/types/ICourse.types";
import LessonItem from "@/components/lesson/LessonItem.vue";
import Hls from 'hls.js'
import NotFoundLayer from "@/components/lesson/VideoLayers/NotFoundLayer.vue";
import LockedLayer from "@/components/lesson/VideoLayers/LockedLayer.vue";
import PlaybackSpeedLayer from "@/components/lesson/VideoLayers/PlaybackSpeedLayer.vue";

const DURATION_TIME_KEY = '--duration-time'

export default defineComponent({
  components: {
    PlaybackSpeedLayer,
    LockedLayer,
    NotFoundLayer,
    LessonItem,
    Container
  },
  props: {
    course: {
      type: Object as PropType<ICourse.Item>,
      required: true
    }
  },
  data: () => ({
    hls: new Hls(),
    lessonNumber: 1,
    notFound: false,
    speed: 1,
    speedChanged: false,
    videoRefName: 'selected-video'
  }),
  computed: {
    lessons () {
      return this.course.lessons.sort((a, b) => a.order - b.order)
    },
    currentLesson () {
      return this.lessons[Number(this.lessonNumber) - 1];
    },
    posterPreviewLink () {
      return `${this.currentLesson.previewImageLink}/lesson-${this.currentLesson.order}.webp`
    },
    unlocked () {
      return this.currentLesson.status === 'unlocked'
    },
    courseLessonKey () {
      return `${this.course.id}-selected-lesson`
    },
    tabbingIndex () {
      return !this.unlocked || this.notFound ? -1 : 0
    },
  },
  watch: {
    currentLesson () {
      this.loadHlsPlayer()
    },
    lessonNumber (newValue: number) {
      this.setSelectedLocal(newValue)
    },
    speed (newValue: number) {
      this.speedChanged = true

      const video = this.$refs['selected-video'] as HTMLMediaElement;
      video.playbackRate = newValue;

      setTimeout(() => this.speedChanged = false, 400)
    }
  },
  mounted () {
    this.initSelectedLesson()
    this.loadHlsPlayer()
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  },
  methods: {
    togglePictureInPicture() {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        const video = this.$refs['selected-video'] as HTMLVideoElement;
        video.requestPictureInPicture();
      }
    },
    changeVideoSpeed (event: KeyboardEvent) {
      const ArrowUpKey = 'ArrowUp'
      const ArrowDownKey = 'ArrowDown'

      const MIN_RATE = 0.25
      const MAX_RATE = 5

      if (this.speed <= MIN_RATE || this.speed >= MAX_RATE) {
        return
      }

      switch (event.key) {
        case ArrowUpKey:
          this.speed += MIN_RATE
          break
        case ArrowDownKey:
          this.speed -= MIN_RATE
          break
        default:
          break
      }
    },
    initSelectedLesson () {
      this.lessonNumber = Number(window.localStorage.getItem(this.courseLessonKey)) || 1
    },
    setSelectedLocal (order: number) {
      window.localStorage.setItem(this.courseLessonKey, order.toString());
    },
    checkCurrentTime(): number {
      const lastSecond = localStorage.getItem(this.currentLesson.id + DURATION_TIME_KEY);
      if (lastSecond) {
        return Number(lastSecond);
      }

      return 0;
    },
    loadHlsPlayer () {
      const video = this.$refs[this.videoRefName] as HTMLMediaElement;

      video.addEventListener('timeupdate', () => {
        let currentTime = JSON.stringify(video.currentTime)
        if (!Number(currentTime)) {
          return
        }
        localStorage.setItem(this.currentLesson.id + DURATION_TIME_KEY, currentTime);
      });

      if ((!this.unlocked || this.notFound)) {
        this.hls.destroy()
        this.hls = new Hls()
        return
      }

      try {
        if (Hls.isSupported()) {
          this.hls.loadSource(this.currentLesson.link);
          this.hls.attachMedia(video);
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.currentTime = this.checkCurrentTime();
          });
          return;
        }
      } catch (err) {
        this.notFound = true
      }
    }
  }
})
</script>

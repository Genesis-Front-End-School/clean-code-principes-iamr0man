<template>
  <div class="PageLesson min-h-screen">
    <div class="relative flex flex-col flex-1 h-full">
      <div class="flex py-12 gap-x-8 tablet:flex-col">
        <div class="basis-8/12 bg-blue-1100 tablet:mb-4">
          <div
            class="relative block min-h-[540px] bg-white border border-gray-200 rounded-lg shadow tablet:min-h-[200px] dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4">
              <VideoPlayer
                ref="selectedVideo"
                :is-available="isAvailable"
                :current-lesson="currentLesson"
                @not-found="setNotFound"
              >
                <template #default="{ speedChanged, speed }">
                  <LockedLayer v-if="!unlocked" />
                  <NotFoundLayer v-if="notFound" />
                  <PlaybackSpeedLayer :show="speedChanged" :speed="speed" />
                </template>
              </VideoPlayer>
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
import NotFoundLayer from '@/components/pages/course/lesson/VideoLayers/NotFoundLayer.vue';
import LockedLayer from '@/components/pages/course/lesson/VideoLayers/LockedLayer.vue';
import PlaybackSpeedLayer from '@/components/pages/course/lesson/VideoLayers/PlaybackSpeedLayer.vue';
import VideoPlayer from '@/components/pages/course/lesson/VideoPlayer.vue';

export default defineComponent({
  components: {
    VideoPlayer,
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
    lessonNumber: 1,
    notFound: false,
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
    unlocked(): boolean {
      return this.currentLesson.status === 'unlocked';
    },
    courseLessonKey(): string {
      return `${this.course.id}-selected-lesson`;
    },
  },
  watch: {
    lessonNumber(newValue: number) {
      this.setSelectedLocal(newValue);
    },
  },
  mounted() {
    this.initSelectedLesson();
  },
  methods: {
    setNotFound(newValue: boolean) {
      this.notFound = newValue
    },
    togglePictureInPicture() {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        const video = this.selectedVideo as HTMLVideoElement;
        video.requestPictureInPicture();
      }
    },
    initSelectedLesson() {
      this.lessonNumber =
        Number(window.localStorage.getItem(this.courseLessonKey)) || 1;
    },
    setSelectedLocal(order: number) {
      window.localStorage.setItem(this.courseLessonKey, order.toString());
    }
  },
});
</script>
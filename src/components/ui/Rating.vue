<template>
  <div class="flex items-center">
    <div class="relative">
      <svg
        :width="starsSizes.w"
        :height="starsSizes.h"
        viewBox="0 0 152 24"
        fill="none">
        <g :fill="`url(#${rating})`">
          <path
            d="M23.2803 9.80061C23.5471 9.56569 23.3978 9.12559 23.0432 9.10137L15.5343 8.58854C15.3789 8.57792 15.2438 8.47805 15.188 8.33259L12.3687 0.974811C12.2375 0.632306 11.7529 0.632306 11.6217 0.974811L8.80241 8.33261C8.74668 8.47806 8.61158 8.57793 8.45618 8.58855L0.955737 9.10137C0.601299 9.12561 0.451991 9.56541 0.71842 9.80042L6.49973 14.9C6.61134 14.9984 6.65907 15.1507 6.62362 15.2952L4.73114 23.012C4.64459 23.3649 5.03544 23.6411 5.33918 23.4416L11.7757 19.2152C11.909 19.1277 12.0815 19.1277 12.2148 19.2152L18.6513 23.4416C18.955 23.6411 19.3459 23.3649 19.2593 23.012L17.3669 15.2954C17.3314 15.1508 17.3793 14.9984 17.491 14.9L23.2803 9.80061Z
            M55.2803 9.80061C55.5471 9.56569 55.3978 9.12559 55.0432 9.10137L47.5343 8.58854C47.3789 8.57792 47.2438 8.47805 47.188 8.33259L44.3687 0.974811C44.2375 0.632306 43.7529 0.632306 43.6217 0.974811L40.8024 8.33261C40.7467 8.47806 40.6116 8.57793 40.4562 8.58855L32.9557 9.10137C32.6013 9.12561 32.452 9.56541 32.7184 9.80042L38.4997 14.9C38.6113 14.9984 38.6591 15.1507 38.6236 15.2952L36.7311 23.012C36.6446 23.3649 37.0354 23.6411 37.3392 23.4416L43.7757 19.2152C43.909 19.1277 44.0815 19.1277 44.2148 19.2152L50.6513 23.4416C50.955 23.6411 51.3459 23.3649 51.2593 23.012L49.3669 15.2954C49.3314 15.1508 49.3793 14.9984 49.491 14.9L55.2803 9.80061Z
            M87.2803 9.80061C87.5471 9.56569 87.3978 9.12559 87.0432 9.10137L79.5343 8.58854C79.3789 8.57792 79.2438 8.47805 79.188 8.33259L76.3687 0.974811C76.2375 0.632306 75.7529 0.632306 75.6217 0.974811L72.8024 8.33261C72.7467 8.47806 72.6116 8.57793 72.4562 8.58855L64.9557 9.10137C64.6013 9.12561 64.452 9.56541 64.7184 9.80042L70.4997 14.9C70.6113 14.9984 70.6591 15.1507 70.6236 15.2952L68.7311 23.012C68.6446 23.3649 69.0354 23.6411 69.3392 23.4416L75.7757 19.2152C75.909 19.1277 76.0815 19.1277 76.2148 19.2152L82.6513 23.4416C82.955 23.6411 83.3459 23.3649 83.2593 23.012L81.3669 15.2954C81.3314 15.1508 81.3793 14.9984 81.491 14.9L87.2803 9.80061Z
            M119.28 9.80061C119.547 9.56569 119.398 9.12559 119.043 9.10137L111.534 8.58854C111.379 8.57792 111.244 8.47805 111.188 8.33259L108.369 0.974811C108.237 0.632306 107.753 0.632306 107.622 0.974811L104.802 8.33261C104.747 8.47806 104.612 8.57793 104.456 8.58855L96.9557 9.10137C96.6013 9.12561 96.452 9.56541 96.7184 9.80042L102.5 14.9C102.611 14.9984 102.659 15.1507 102.624 15.2952L100.731 23.012C100.645 23.3649 101.035 23.6411 101.339 23.4416L107.776 19.2152C107.909 19.1277 108.081 19.1277 108.215 19.2152L114.651 23.4416C114.955 23.6411 115.346 23.3649 115.259 23.012L113.367 15.2954C113.331 15.1508 113.379 14.9984 113.491 14.9L119.28 9.80061Z
            M151.28 9.80061C151.547 9.56569 151.398 9.12559 151.043 9.10137L143.534 8.58854C143.379 8.57792 143.244 8.47805 143.188 8.33259L140.369 0.974811C140.237 0.632306 139.753 0.632306 139.622 0.974811L136.802 8.33261C136.747 8.47806 136.612 8.57793 136.456 8.58855L128.956 9.10137C128.601 9.12561 128.452 9.56541 128.718 9.80042L134.5 14.9C134.611 14.9984 134.659 15.1507 134.624 15.2952L132.731 23.012C132.645 23.3649 133.035 23.6411 133.339 23.4416L139.776 19.2152C139.909 19.1277 140.081 19.1277 140.215 19.2152L146.651 23.4416C146.955 23.6411 147.346 23.3649 147.259 23.012L145.367 15.2954C145.331 15.1508 145.379 14.9984 145.491 14.9L151.28 9.80061Z" />
        </g>
        <defs>
          <linearGradient :id="rating" :class="color" class="fill-current">
            <stop :offset="starsWidth" stop-color="currentColor" />
            <stop stop-color="#CCCCCC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span v-if="withValue" class="text-16 ml-8 -mb-4">
      {{ rating }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

type Size = 'small' | 'medium' | 'large' | string;
type ImageSizes = { w: number; h: number };

const MARGIN_COUNT = 4;

export default defineComponent({
  props: {
    rating: {
      type: [String, Number] as PropType<string | number>,
      required: false,
      default: 0,
    },

    size: {
      type: String as PropType<Size>,
      required: false,
      default: 'medium',
      validator: (v: string) => ['small', 'medium', 'large'].includes(v),
    },

    withValue: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },

    color: {
      type: String as PropType<string>,
      required: false,
      default: 'text-orange-600',
      validator: (v: string) => {
        const isValid = v.split('-')[0] === 'text';
        if (!isValid) console.error('Color prop must begin with text- prefix');
        return isValid;
      },
    },
  },

  computed: {
    singleMarginPixelWidth(): number {
      const margins: Record<Size, number> = {
        small: 4,
        medium: 6,
        large: 8,
      };
      return margins[this.size];
    },

    starsSizes(): ImageSizes {
      const sizes: Record<Size, ImageSizes> = {
        small: { w: 96, h: 16 },
        medium: { w: 124, h: 20 },
        large: { w: 152, h: 24 },
      };
      return sizes[this.size];
    },

    marginWidth(): number {
      return (
        (100 / this.starsSizes.w) * (this.singleMarginPixelWidth * MARGIN_COUNT)
      );
    },

    marginCount(): number {
      const regulator = Number.isInteger(this.rating) ? -1 : 0;
      return Math.floor(Number(this.rating) + regulator);
    },

    marginCurrentWidth(): number {
      let marginsCurrentWidth = 0;
      if (this.marginCount > 0) {
        marginsCurrentWidth =
          (this.marginWidth / MARGIN_COUNT) * this.marginCount;
      }
      return marginsCurrentWidth;
    },

    starsWidth(): string {
      if (this.rating <= 0) return '0%';
      const width =
        ((100 - this.marginWidth) / 5) * Number(this.rating) +
        this.marginCurrentWidth;
      return `${width}%`;
    },
  },
});
</script>

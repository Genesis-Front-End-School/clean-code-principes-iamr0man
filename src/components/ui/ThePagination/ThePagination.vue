<template>
  <nav aria-label="Page navigation example">
    <div
      class="text-sm text-gray-700 dark:text-gray-400 mb-2"
      v-if="layout === 'table'">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{
        startItemsCount
      }}</span>
      to
      <span class="font-semibold text-gray-900 dark:text-white">{{
        endItemsCount
      }}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{
        computedTotalItems
      }}</span>
    </div>
    <ul class="inline-flex -space-x-px">
      <li>
        <PreviousButton
          :disabled="isDecreaseDisabled"
          :label="previousLabel"
          @click="decreasePage" />
      </li>
      <li v-for="pageIndex in pagesToDisplay" :key="pageIndex">
        <PageItem
          :current-page="modelValue"
          :index="pageIndex"
          @setPage="setPage" />
      </li>
      <li>
        <NextButton
          :disabled="isIncreaseDisabled"
          :label="nextLabel"
          @click="increasePage" />
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';
import PreviousButton from '@/components/ui/ThePagination/PreviousButton.vue';
import PageItem from '@/components/ui/ThePagination/PageItem.vue';
import NextButton from '@/components/ui/ThePagination/NextButton.vue';

export type PaginationLayout = 'navigation' | 'pagination' | 'table';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  totalItems: {
    type: Number,
    required: false,
  },
  layout: {
    type: String as PropType<PaginationLayout>,
    default: 'pagination',
  },
  sliceLength: {
    type: Number,
    default: 2,
  },
  previousLabel: {
    type: String,
    default: 'Previous',
  },
  nextLabel: {
    type: String,
    default: 'Next',
  },
});

const setPage = (index: number) => {
  emit('update:modelValue', index);
};
const decreasePage = () => {
  emit('update:modelValue', props.modelValue - 1);
};
const increasePage = () => {
  emit('update:modelValue', props.modelValue + 1);
};

const computedTotalPages = computed(() => {
  if (!props.totalItems) return props.totalPages;
  if (!props.perPage) return props.totalPages;

  return Math.ceil(props.totalItems / props.perPage);
});

const isDecreaseDisabled = computed(() => props.modelValue <= 1);
const isIncreaseDisabled = computed(
  () => props.modelValue >= computedTotalPages.value,
);

const getTotalPagesArray = () => {
  const pages = [];
  for (let page = 1; page <= computedTotalPages.value; page++) {
    pages.push(page);
  }
  return pages;
};

const getPagesWithoutSlice = () => {
  const pages = [];
  const slicedLength =
    Math.abs(props.modelValue - props.sliceLength) +
    props.modelValue +
    props.sliceLength +
    1;
  for (let page = 1; page <= slicedLength; page++) {
    pages.push(page);
  }
  return pages;
};

const getEndOfPagination = () => {
  const pages = [];
  for (
    let page = Math.abs(computedTotalPages.value - props.sliceLength * 2);
    page <= computedTotalPages.value;
    page++
  ) {
    pages.push(page);
  }
  return pages;
};

const getPagesWithNewView = () => {
  const pages = [];
  let startedPage =
    props.modelValue - props.sliceLength > 0
      ? props.modelValue - props.sliceLength
      : 1;
  for (
    let page = startedPage;
    page < props.modelValue + props.sliceLength + 1;
    page++
  ) {
    if (page >= computedTotalPages.value) break;
    pages.push(page);
  }
  return pages;
};

const pagesToDisplay = computed(() => {
  if (props.layout === 'navigation') return [];
  if (props.layout === 'table') return [];

  const sliceLengthCoverAllPages =
    computedTotalPages.value <= props.sliceLength * 2 + 1;
  if (sliceLengthCoverAllPages) return getTotalPagesArray();

  const withoutSliceLength = props.modelValue <= props.sliceLength;
  if (withoutSliceLength) return getPagesWithoutSlice();

  const endOfPagination =
    props.modelValue >= computedTotalPages.value - props.sliceLength;
  if (endOfPagination) return getEndOfPagination();

  return getPagesWithNewView();
});

const startItemsCount = computed(
  () => props.modelValue * props.perPage - props.perPage + 1,
);
const endItemsCount = computed(() => {
  const count = props.modelValue * props.perPage + 1;
  if (!props.totalItems) return count;
  if (count > props.totalItems) return props.totalItems;

  return count;
});
const computedTotalItems = computed(() => {
  if (props.totalItems) return props.totalItems;

  return computedTotalPages.value * props.perPage;
});
</script>

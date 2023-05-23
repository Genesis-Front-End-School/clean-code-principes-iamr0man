<template>
  <nav aria-label="Page navigation example">
    <div
      v-if="layout === 'table'"
      class="text-sm text-gray-700 dark:text-gray-400 mb-2">
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
          @set-page="setPage" />
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
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import PreviousButton from '@/shared/components/ui/ThePagination/PreviousButton.vue';
import PageItem from '@/shared/components/ui/ThePagination/PageItem.vue';
import NextButton from '@/shared/components/ui/ThePagination/NextButton.vue';

export type PaginationLayout = 'navigation' | 'pagination' | 'table';
export default defineComponent({
  components: {
    PreviousButton,
    PageItem,
    NextButton,
  },
  props: {
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
      default: 0,
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
  },
  emits: ['update:modelValue'],
  computed: {
    computedTotalPages(): number {
      if (!this.totalItems) return this.totalPages;
      if (!this.perPage) return this.totalPages;

      return Math.ceil(this.totalItems / this.perPage);
    },
    isDecreaseDisabled() {
      return this.modelValue <= 1;
    },
    isIncreaseDisabled() {
      return this.modelValue >= this.computedTotalPages;
    },
    pagesToDisplay(): number[] {
      if (this.layout === 'navigation') return [];
      if (this.layout === 'table') return [];

      const sliceLengthCoverAllPages =
        this.computedTotalPages <= this.sliceLength * 2 + 1;
      if (sliceLengthCoverAllPages) return this.getTotalPagesArray();

      const withoutSliceLength = this.modelValue <= this.sliceLength;
      if (withoutSliceLength) return this.getPagesWithoutSlice();

      const endOfPagination =
        this.modelValue >= this.computedTotalPages - this.sliceLength;
      if (endOfPagination) return this.getEndOfPagination();

      return this.getPagesWithNewView();
    },
    startItemsCount() {
      return this.modelValue * this.perPage - this.perPage + 1;
    },
    endItemsCount() {
      const count = this.modelValue * this.perPage + 1;
      if (!this.totalItems) return count;
      if (count > this.totalItems) return this.totalItems;

      return count;
    },
    computedTotalItems() {
      if (this.totalItems) return this.totalItems;

      return this.computedTotalPages * this.perPage;
    },
  },
  methods: {
    setPage(index: number) {
      this.$emit('update:modelValue', index);
    },
    decreasePage() {
      this.$emit('update:modelValue', this.modelValue - 1);
    },
    increasePage() {
      this.$emit('update:modelValue', this.modelValue + 1);
    },
    getTotalPagesArray() {
      const pages = [];
      for (let page = 1; page <= this.computedTotalPages; page++) {
        pages.push(page);
      }
      return pages;
    },
    getPagesWithoutSlice() {
      const pages = [];
      const slicedLength =
        Math.abs(this.modelValue - this.sliceLength) +
        this.modelValue +
        this.sliceLength +
        1;
      for (let page = 1; page <= slicedLength; page++) {
        pages.push(page);
      }
      return pages;
    },
    getEndOfPagination() {
      const pages = [];
      for (
        let page = Math.abs(this.computedTotalPages - this.sliceLength * 2);
        page <= this.computedTotalPages;
        page++
      ) {
        pages.push(page);
      }
      return pages;
    },
    getPagesWithNewView() {
      const pages = [];
      const startedPage =
        this.modelValue - this.sliceLength > 0
          ? this.modelValue - this.sliceLength
          : 1;
      for (
        let page = startedPage;
        page < this.modelValue + this.sliceLength + 1;
        page++
      ) {
        if (page >= this.computedTotalPages) break;
        pages.push(page);
      }
      return pages;
    },
  },
});
</script>

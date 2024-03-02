<template>
  <div class="autocomplete">
    <label v-if="label" class="text-font">{{ label }}</label>
    <div class="relative">
      <input
        type="text"
        v-model="search"
        class="outline-4 outline-blue-400 border-2 border-blue-300 enabled:hover:border-blue-400 focus:border-blue-600 w-96 pl-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 block p-2.5 disable:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        :placeholder="!isDisabled ? placeholder : null"
        @input="onChange"
        @focus="this.searchOnFocus ? onChange() : null"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="toggleCheckbox(results[arrowCounter])"
        @keydown.esc="isOpen = false"
        :disabled="isDisabled"
      />

      <LoadSpinner v-if="isLoading" class="absolute inset-y-3 right-11" />
      <CancelButton
        v-if="!isDisabled"
        class="absolute top-0 right-3 flex items-center justify-center h-full"
        @click="reset()"
      />

      <ul
        v-show="isOpen && !isLoading"
        class="absolute overflow-y-auto z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60"
        id="dropdown"
        role="dropdown"
        ref="dropdownList"
      >
        <li v-if="results.length === 0 && search.length !== 0">
          <div class="flex-1 px-4 py-4">No results found.</div>
        </li>
        <li
          v-else
          v-for="(result, i) in results"
          :key="i"
          class="px-4 py-2 transition-colors duration-300 ease-in-out cursor-pointer flex items-center"
          @click="toggleCheckbox(result)"
          @mouseover="handleMouseover(i)"
          :style="{
            backgroundColor: i === arrowCounter ? '#DBF6F9' : 'white',
          }"
          @keydown.enter.prevent="toggleCheckbox(result)"
        >
          <div class="flex-1">
            <slot :element="result">
              {{ result[identifierAttribute] }}
            </slot>
          </div>
          <input
            type="checkbox"
            class="accent-cyan-300 focus:accent-cyan-500 transform scale-150"
            :value="result"
            v-model="selected"
          />
        </li>
      </ul>
    </div>
    <label v-if="description" class="text-font">{{ description }}</label>
  </div>
</template>

<script>
import { debounce } from "./utils/debounce.js";
import LoadSpinner from "./LoadSpinner.vue";
import CancelButton from "./CancelButton.vue";

export default {
  name: "SearchAutocomplete",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
      default: "Enter text here",
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    identifierAttribute: {
      type: String,
      required: false,
      default: "",
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    searchOnFocus: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      search: "",
      results: [],
      selected: [],
      isOpen: false,
      arrowCounter: -1,
      isLoading: false,
    };
  },
  components: {
    LoadSpinner,
    CancelButton,
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  computed: {
    filteredResults() {
      return this.items.filter(
        (item) =>
          item[this.identifierAttribute]
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      );
    },
  },
  methods: {
    reset() {
      this.search = "";
      this.isOpen = false;
    },
    setData(payload) {
      this.items = payload;
    },
    updateItems() {
      this.results = this.filteredResults;
      this.isLoading = false;
      this.isOpen = true;
    },
    onChange() {
      if (this.isAsync) {
        this.isLoading = true;
        this.isOpen = true;
        debounce()(this.updateItems.bind(this), 800);
      } else {
        this.updateItems();
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1;
        this.isOpen = false;
      }
    },
    onArrowDown() {
      this.arrowCounter = this.arrowCounter + 1;
      if (this.arrowCounter >= this.results.length) {
        this.arrowCounter = 0;
      }
      this.scrollToHighlightedItem();
    },
    onArrowUp() {
      this.arrowCounter = this.arrowCounter - 1;
      if (this.arrowCounter < 0) {
        this.arrowCounter = this.results.length - 1;
      }
      this.scrollToHighlightedItem();
    },
    toggleCheckbox(result) {
      result.checked = !result.checked;
      if (result.checked) {
        this.selected.push(result);
      } else {
        this.selected = this.selected.filter(
          (item) =>
            item[this.identifierAttribute] !== result[this.identifierAttribute]
        );
      }
      this.$emit("result-selected", this.selected);
    },
    handleMouseover(index) {
      this.arrowCounter = index;
    },
    scrollToHighlightedItem() {
      this.$nextTick(() => {
        const listContainer = this.$refs.dropdownList;
        if (!listContainer) return;

        if (this.arrowCounter === 0) {
          listContainer.scrollTop = 0; // Scroll to the top
        } else if (this.arrowCounter === this.results.length - 1) {
          listContainer.scrollTop = listContainer.scrollHeight; // Scroll to the bottom
        } else {
          const highlightedItem = listContainer.querySelector(
            `li:nth-child(${this.arrowCounter + 1})`
          );
          if (highlightedItem) {
            highlightedItem.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }
      });
    },
  },
};
</script>

<style>
.text-font {
  font-size: 1rem;
  line-height: 1.5;
  color: #515151;
}
</style>

<template>
  <div id="app">
    <div class="flex justify-center items-center h-screen font-sans">
      <div class="bg-gray-100 p-6 rounded-lg shadow-lg relative">
        <SearchAutocomplete
          :items="data1"
          :isAsync="true"
          :label="'Async Search'"
          :description="'With description and custom results display'"
          :identifierAttribute="'name'"
          :searchOnFocus="false"
          class="mb-10"
        >
          <template v-slot="slotProps">
            <DisplayTemplate1
              :element="slotProps.element"
              :mainAttribute="'name'"
              :logoAttribute="'id'"
              :captionAttribute="'location'"
            />
          </template>
        </SearchAutocomplete>
      </div>
    </div>
  </div>
</template>

<script>
import SearchAutocomplete from "./components/SearchAutocomplete.vue";
import DisplayTemplate1 from "./components/DisplayTemplate1.vue";
import airportsData from "./data/airports.js";

export default {
  name: "App",
  components: {
    SearchAutocomplete,
    DisplayTemplate1,
  },
  data() {
    return {
      data1: airportsData,
    };
  },
};
</script>

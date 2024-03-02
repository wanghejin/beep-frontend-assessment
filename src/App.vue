<template>
  <div id="app">
    <div class="flex justify-center items-center h-screen font-sans">
      <div class="bg-gray-100 p-6 rounded-lg shadow-lg relative">
        <SearchAutocomplete
          :items="data1"
          :isAsync="true"
          :label="'Async Search'"
          :description="'With description and custom results display'"
          :displayAttribute="'name'"
          :captionAttribute="'airport_code'"
          :logoAttribute="'id'"
          :searchOnFocus="false"
          class="mb-10"
        />
        <SearchAutocomplete
          :items="data1"
          :isAsync="false"
          :label="'Sync Search'"
          :description="'With default display and search on focus'"
          :displayAttribute="'name'"
          :searchOnFocus="true"
          class="mb-10"
        />
        <SearchAutocomplete :isDisabled="true" :label="'Disabled Input'" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchAutocomplete from "./components/SearchAutocomplete.vue";
import airportsData from "./data/airports.js";

export default {
  name: "App",
  components: {
    SearchAutocomplete,
  },
  data() {
    return {
      data1: airportsData,
      data2: airportsData,
    };
  },
};
</script>

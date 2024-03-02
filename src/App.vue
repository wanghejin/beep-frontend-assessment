<template>
  <div id="app">
    <div class="flex justify-center items-center h-screen font-sans">
      <SearchAutocomplete
        :items="data1"
        :isAsync="true"
        :label="'name'"
        :description="'airport_code'"
        :searchOnFocus="false"
      />
      <SearchAutocomplete
        :items="data1"
        :isAsync="false"
        :label="'name'"
        :description="'airport_code'"
        :searchOnFocus="true"
      />
      <SearchAutocomplete :isDisabled="true" />
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

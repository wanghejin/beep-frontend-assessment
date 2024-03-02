<template>
  <div id="app">
    <div class="flex justify-center items-center h-screen font-sans">
      <SearchAutocomplete
        :isAsync="true"
        :label="'name'"
        :description="'airport_code'"
        :searchOnFocus="true"
      />
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
    airportsData,
  },
};
</script>

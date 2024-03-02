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
              :logoAttribute="'airport_code'"
              :captionAttribute="'location'"
            />
          </template>
        </SearchAutocomplete>

        <SearchAutocomplete
          :items="data2"
          :isAsync="false"
          :label="'Sync Search'"
          :description="'With default display and search on focus'"
          :identifierAttribute="'Model'"
          :searchOnFocus="true"
          class="mb-10"
        >
          <template v-slot="slotProps">
            <DisplayTemplate2
              :element="slotProps.element"
              :mainAttribute="'Model'"
            />
          </template>
        </SearchAutocomplete>

        <SearchAutocomplete
          :isDisabled="true"
          :label="'Disabled Input'"
        ></SearchAutocomplete>
      </div>
    </div>
  </div>
</template>

<script>
import SearchAutocomplete from "./components/SearchAutocomplete.vue";
import DisplayTemplate1 from "./components/DisplayTemplate1.vue";
import DisplayTemplate2 from "./components/DisplayTemplate2.vue";
import airportsData from "./data/airports.js";
import carsData from "./data/cars.js";

export default {
  name: "App",
  components: {
    SearchAutocomplete,
    DisplayTemplate1,
    DisplayTemplate2,
  },
  data() {
    return {
      data1: airportsData,
      data2: carsData,
    };
  },
};
</script>

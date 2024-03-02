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
            <div class="flex-1 flex flex-col justify-end">
              <div class="flex mb-2">
                <div class="text-xs font-mono">{{ slotProps.element.id }}</div>
                <div class="flex-1 ml-2">{{ slotProps.element.name }}</div>
              </div>
              <div class="text-sm text-gray-500">
                Location: {{ slotProps.element.location }}
              </div>
            </div>
          </template>
        </SearchAutocomplete>
        <!-- <SearchAutocomplete
          :items="data1"
          :isAsync="false"
          :label="'Sync Search'"
          :description="'With default display and search on focus'"
          :identifierAttribute="'name'"
          :searchOnFocus="true"
          class="mb-10"
        />
        <SearchAutocomplete :isDisabled="true" :label="'Disabled Input'" /> -->
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

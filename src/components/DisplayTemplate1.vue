<template>
  <div class="flex-1 flex flex-col justify-end">
    <div class="flex mb-2">
      <div class="text-xs font-mono">{{ element[logoAttribute] }}</div>
      <div class="flex-1 ml-2">{{ element[mainAttribute] }}</div>
    </div>
    <div class="text-sm text-gray-500">
      {{ captionAttribute }}: {{ element[captionAttribute] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayTemplate1",
  props: {
    element: {
      type: Object,
      required: true,
    },
    mainAttribute: {
      type: String,
      required: true,
      default: "",
    },
    captionAttribute: {
      type: String,
      required: true,
      default: "",
    },

    logoAttribute: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<template>
  <div class="flex-1 flex flex-col justify-end">
    <div class="flex-1 ml-2">{{ element[mainAttribute] }}</div>
  </div>
</template>

<script>
export default {
  name: "DisplayTemplate2",
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
  },
};
</script>

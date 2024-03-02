<template>
  <div
    class="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-gray-300 rounded-full dark:text-gray-200"
    role="status"
    aria-label="loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  name: "LoadSpinner",
};
</script>

<template>
  <div class="flex-1 flex flex-col justify-end">
    <div class="flex mb-2">
      <div class="text-xs font-mono">
        <slot name="id"></slot>
      </div>
      <div class="flex-1 ml-2">
        <slot></slot>
      </div>
    </div>
    <div class="text-sm text-gray-500">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayList",
};
</script>

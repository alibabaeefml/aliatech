<script setup>
defineProps({
  width: { default: "100%", type: String, required: false },
  height: { default: "100%", type: String, required: false },
});
</script>
<template>
  <div
    class="bg-white rounded-3xl shadow-md sm:p-8 p-4"
    :style="{ width: width, height: height }"
  >
    <slot></slot>
  </div>
</template>

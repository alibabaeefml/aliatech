<script setup>
defineProps({
  width: { default: "100%", type: String, required: false },
  height: { default: "100%", type: String, required: false },
});
</script>
<template>
  <div
    class="bg-white rounded-xl shadow-lg p-8"
    :style="{ width: width, height: height }"
  >
    <slot></slot>
  </div>
</template>

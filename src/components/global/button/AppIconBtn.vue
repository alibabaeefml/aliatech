<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  size: {
    type: [String, Number],
    default: "24",
  },
});
</script>
<template>
  <button
    type="button"
    class="hover:bg-primary/20 flex items-center justify-center rounded-full p-1"
  >
    <app-icon :name="icon" :size="size" />
  </button>
</template>

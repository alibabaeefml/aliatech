<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  size: {
    type: [String, Number],
    default: "16",
  },
  color: {
    type: String,
    default: "black",
  },
  disabled: { type: Boolean, required: false },
});
</script>
<template>
  <button
    type="button"
    class="hover:bg-primary/20 flex items-center justify-center rounded-full p-2"
    :class="[disabled && 'opacity-20 bg-primary/10']"
    :disabled="disabled"
  >
    <app-icon :name="icon" :size="size" :color="color" />
  </button>
</template>

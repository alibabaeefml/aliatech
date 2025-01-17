<script setup>
import { defineProps, computed, ref } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    requiered: false,
  },
  disabled: {
    type: Boolean,
    requiered: false,
  },
  theme: {
    type: String,
    default: "primary",
    requiered: false,
  },
});

const themes = ref({
  primary: "bg-primary text-white hover:bg-primary/80",
  secondary: "bg-white text-primary hover:bg-primary/20 border",
});
</script>
<template>
  <button
    :disabled="disabled || loading"
    class="flex items-center justify-center p-3 rounded-xl disabled:cursor-not-allowed disabled:bg-gray-400"
    :class="[themes[theme]]"
  >
    <span v-if="loading" class="animate-pulse font-black">● ● ●</span>
    <slot v-else></slot>
  </button>
</template>

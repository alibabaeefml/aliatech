<template>
  <button
    :disabled="disabled || loading"
    class="flex items-center justify-center p-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/80 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    <span v-if="loading" class="animate-pulse font-black">● ● ●</span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :disabled="loading"
    class="app-btn flex items-center justify-center px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/80 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
});
</script>

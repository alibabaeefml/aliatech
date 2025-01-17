<template>
  <label class="relative flex items-center cursor-pointer w-10 h-6">
    <!-- Hidden Checkbox -->
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <!-- Toggle Background -->
    <div
      class="w-full h-full bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-accent-orange"
    ></div>

    <!-- Toggle Knob -->
    <div
      class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:-translate-x-4 flex items-center justify-center"
    >
      <app-icon
        :name="modelValue ? 'Check' : 'X'"
        :key="modelValue"
        :color="modelValue ? $colors.accent.orange : $colors.neutral['200']"
        size="10"
      ></app-icon>
    </div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});
defineEmits(["update:modelValue"]);
</script>

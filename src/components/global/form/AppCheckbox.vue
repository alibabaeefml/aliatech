<script setup>
defineProps({
  modelValue: { type: Boolean, required: true },
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <label>
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <div
      class="w-4 h-4 bg-white border rounded-xl transition-colors duration-300 peer-checked:bg-accent-orange"
    ></div>
  </label>
</template>

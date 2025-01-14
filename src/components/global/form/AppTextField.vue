<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String || Number, required: true },
  title: { type: String, required: true },
  typo: { type: String, default: "text", required: false },
  autoFocus: { type: Boolean, default: false, required: false },
  name: { type: String, required: false },
  id: { type: String, required: false },
});

const model = computed({
  get() {
    return props.modelValue;
  },
});
const inputRef = ref();

watch(
  () => props.autoFocus,
  () => {
    if (props.autoFocus) inputRef.focus();
  }
);
</script>
<template>
  <label>
    <p>{{ title }}</p>
    <input :type="type" :name="name" :id="id" ref="inputRef" />
  </label>
</template>

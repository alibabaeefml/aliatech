<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: [String, Number, null], required: true },
  title: { type: String, required: false },
  autoFocus: { type: Boolean, default: false, required: false },
  name: { type: String, required: false },
  id: { type: String, required: false },
  placeholder: { type: String, required: false },
  errorMessage: { type: String, required: false },
  rows: { type: [String, Number], required: false },
});

const emits = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const textAreaRef = ref();

watch(textAreaRef, () => {
  if (props.autoFocus) {
    textAreaRef.value.focus();
  }
});
</script>

<template>
  <label class="relative block">
    <p class="text-xs" v-if="title">{{ title }}</p>
    <textarea
      ref="textAreaRef"
      :name="name"
      :id="id"
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      class="mt-2 border bg-neutral-100 w-full p-3 rounded-xl text-sm resize-none"
    />
    <p class="text-red-500 text-xs mt-2" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </label>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: [String, Number, null], required: true },
  title: { type: String, required: true },
  type: { type: String, default: "text", required: false },
  autoFocus: { type: Boolean, default: false, required: false },
  name: { type: String, required: false },
  id: { type: String, required: false },
  prependIcon: { type: String, required: false },
  placeholder: { type: String, required: false },
  errorMessage: { type: String, required: false },
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
const inputRef = ref();
const currentType = ref(props.type);

const togglePasswordVisibility = () =>
  (currentType.value = currentType.value == "password" ? "text" : "password");

const showPassword = computed(() => currentType.value == "text");
watch(inputRef, () => {
  if (props.autoFocus) {
    inputRef.value.focus();
  }
});
</script>
<template>
  <label class="relative">
    <p class="text-xs">{{ title }}</p>
    <app-icon
      v-if="prependIcon"
      :name="prependIcon"
      size="16"
      class="absolute mt-5 m-3"
    />
    <input
      :type="currentType"
      :name="name"
      :id="id"
      ref="inputRef"
      :placeholder="placeholder"
      v-model="model"
      :class="[prependIcon && 'pr-10', type == 'password' && 'pl-10']"
      class="mt-2 border bg-neutral-100 w-full p-3 rounded-xl text-sm"
    />
    <app-icon-btn
      @click="togglePasswordVisibility"
      v-if="type == 'password'"
      :icon="showPassword ? 'Eye' : 'EyeOff'"
      class="absolute top-8 left-2"
      size="16"
      :key="showPassword"
    >
    </app-icon-btn>
    <p class="text-red-500 text-xs mt-2" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </label>
</template>

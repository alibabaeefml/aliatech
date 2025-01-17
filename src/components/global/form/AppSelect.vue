<script setup>
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number, null],
    default: null,
  },
  title: { type: String, required: false },
  disabled: { type: Boolean, required: false },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownContainer = ref(null);
const focusedOptionIndex = ref(-1);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) focusedOptionIndex.value = -1;
}

function selectOption(option) {
  emit("update:modelValue", typeof option === "object" ? option.value : option); // Emit value only
  isOpen.value = false;
}

function displayOption(option) {
  return typeof option === "object" && option.title ? option.title : option;
}

function selectedTitle() {
  const selected = props.options.find(
    (option) =>
      (typeof option === "object" ? option.value : option) === props.modelValue
  );
  return selected
    ? displayOption(selected) // Display title of the selected option
    : "انتخاب کنید";
}

function handleKeyDown(event) {
  if (!isOpen.value && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    toggleDropdown();
  } else if (isOpen.value) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusedOptionIndex.value =
        (focusedOptionIndex.value + 1) % props.options.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusedOptionIndex.value =
        (focusedOptionIndex.value - 1 + props.options.length) %
        props.options.length;
    } else if (event.key === "Enter" && focusedOptionIndex.value >= 0) {
      event.preventDefault();
      selectOption(props.options[focusedOptionIndex.value]);
    } else if (event.key === "Escape") {
      isOpen.value = false;
    }
  }
}

function handleFocusOut(event) {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.relatedTarget)
  ) {
    isOpen.value = false;
  }
}

function handleFocus() {
  if (!isOpen.value) focusedOptionIndex.value = -1;
}
</script>

<template>
  <div
    ref="dropdownContainer"
    class="relative text-sm"
    tabindex="0"
    @keydown="handleKeyDown"
    @focus="handleFocus"
    @focusout="handleFocusOut"
    :class="[disabled && 'pointer-events-none']"
  >
    <p class="text-xs cursor-pointer" @click="toggleDropdown" v-if="title">
      {{ title }}
    </p>

    <div
      class="mt-2 flex justify-between items-center bg-white p-2 border border-gray-300 rounded-xl cursor-pointer focus:outline focus:outline-blue-500"
      @click="toggleDropdown"
      :class="[disabled && 'bg-neutral-200']"
    >
      <span>{{ selectedTitle() }}</span>

      <app-icon
        name="Chevron"
        class="transform transition-transform"
        :class="{ 'rotate-180': isOpen }"
      ></app-icon>
    </div>

    <div
      v-if="isOpen"
      class="absolute w-full bg-white border border-gray-300 rounded-xl shadow-lg mt-1 z-10 max-h-32 overflow-auto"
    >
      <div
        v-for="(option, index) in options"
        :key="typeof option === 'object' ? option.value : option"
        class="p-3 hover:bg-gray-100 cursor-pointer"
        :class="{
          'bg-blue-100': index === focusedOptionIndex,
        }"
        @click="selectOption(option)"
      >
        {{ displayOption(option) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Scrollbar Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Scrollbar Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Scrollbar Handle on Hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<template>
  <div ref="dropdownContainer" class="relative text-sm">
    <div
      class="flex justify-between items-center bg-white p-3 border border-gray-300 rounded-xl cursor-pointer"
      @click="toggleDropdown"
    >
      <span>{{ modelValue || "انتخاب کنید" }}</span>

      <app-icon
        name="Chevron"
        class="transform transition-transform"
        :class="{ 'rotate-180': isOpen }"
      ></app-icon>
    </div>

    <div
      v-if="isOpen"
      class="absolute w-full bg-white border border-gray-300 rounded-xl shadow-lg mt-1 z-10"
    >
      <div
        v-for="option in options"
        :key="option"
        class="p-3 hover:bg-gray-100 cursor-pointer"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object, null],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownContainer = ref(null);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  emit("update:modelValue", option);
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Array],
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  isList: { type: Boolean, required: false },
  editable: { type: Boolean, required: false },
});

const selectedValue = ref(props.modelValue); // For single selection (radio)
const selectedValues = ref(props.modelValue || []); // For multiple selection (checkbox)
const newOption = ref();
watch(
  () => props.modelValue,
  (newValue) => {
    if (props.multiple) {
      selectedValues.value = Array.isArray(newValue) ? newValue : [];
    } else {
      selectedValue.value = newValue;
    }
  }
);

const emit = defineEmits();

const handleChange = () => {
  if (props.multiple) {
    emit("update:modelValue", selectedValues.value);
  } else {
    emit("update:modelValue", selectedValue.value);
  }
};
</script>

<template>
  <div class="flex flex-col space-y-3">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center space-x-2 gap-2"
    >
      <input
        type="radio"
        v-if="!multiple && !isList"
        :id="option.value"
        :value="option.value"
        v-model="selectedValue"
        :name="name"
        @change="handleChange"
        class="h-4 w-4 text-accent-orange accent-accent-orange focus:ring-accent-orange"
        :disabled="disabled"
      />
      <input
        type="checkbox"
        v-else-if="!isList"
        :id="option.value"
        :value="option.value"
        v-model="selectedValues"
        :name="name"
        @change="handleChange"
        class="h-4 w-4 text-accent-orange accent-accent-orange focus:ring-accent-orange"
        :disabled="disabled"
      />
      <label
        :for="option.value"
        class="text-sm font-medium text-gray-700 cursor-pointer"
      >
        <span v-if="isList">{{ index + 1 }}-</span> {{ option.label }}
      </label>
      <app-icon-btn
        v-if="editable"
        class="bg-neutral-200 rounded-md p-0.5"
        color="gray"
        size="10"
        icon="X"
        @click="$emit('removeOption', option.value)"
      ></app-icon-btn>
    </div>
    <div class="flex items-center gap-2">
      <input
        type="radio"
        v-if="!multiple && !isList"
        v-model="selectedValue"
        :name="name"
        @change="handleChange"
        class="h-4 w-4 text-accent-orange accent-accent-orange focus:ring-accent-orange"
        :disabled="disabled"
      />
      <input
        type="checkbox"
        v-else-if="!isList"
        v-model="selectedValues"
        :name="name"
        @change="handleChange"
        class="h-4 w-4 text-accent-orange accent-accent-orange focus:ring-accent-orange"
        :disabled="disabled"
      />
      <input
        type="text"
        v-model="newOption"
        class="outline-none text-xs w-32"
        :placeholder="
          (isList ? options.length + 1 + '- ' : '') + 'افزودن گزینه جدید...'
        "
      />
      <app-icon-btn
        v-if="newOption"
        icon="Check"
        @click="$emit('addOption', newOption), (newOption = null)"
      ></app-icon-btn>
    </div>
  </div>
</template>

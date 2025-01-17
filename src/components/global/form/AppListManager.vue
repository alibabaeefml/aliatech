<script setup>
const props = defineProps({
  items: { type: Array, required: true },
});
</script>
<template>
  <ul>
    <li v-for="item in items" :key="item"></li>
    <div class="flex items-center gap-2">
      <input
        type="radio"
        v-if="!multiple"
        v-model="selectedValue"
        :name="name"
        @change="handleChange"
        class="h-4 w-4 text-accent-orange accent-accent-orange focus:ring-accent-orange"
        :disabled="disabled"
      />
      <input
        type="checkbox"
        v-else
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
        placeholder="افزودن گزینه جدید..."
      />
      <app-icon-btn
        v-if="newOption"
        icon="Check"
        @click="$emit('addOption', newOption), (newOption = null)"
      ></app-icon-btn>
    </div>
  </ul>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
});
</script>
<template>
  <div class="mt-4">
    <app-textfield
      v-if="item.type == 'text'"
      placeholder="پاسخ شما"
      class="w-64"
      :disabled="true"
    />
    <app-textarea
      v-if="item.type == 'textarea'"
      placeholder="پاسخ شما"
      rows="10"
      :disabled="true"
    />
    <app-radio
      v-if="
        item.type == 'radio' ||
        item.type == 'checkbox' ||
        item.type == 'dropdown'
      "
      :options="item.properties"
      name="radio-group"
      :multiple="item.type == 'checkbox'"
      :is-list="item.type == 'dropdown'"
      :disabled="true"
      :editable="true"
      @removeOption="
        (value) =>
          (item.properties = item.properties.filter((v) => v.value != value))
      "
      @addOption="
        (newOption) =>
          item.properties.push({ label: newOption, value: newOption })
      "
    />
    <app-fileinput v-if="item.type == 'file'" />
  </div>
</template>

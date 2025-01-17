<script setup>
import useForm from "@/composables/form";

const props = defineProps({
  item: { type: Object, required: true },
});

const {
  moveSectionForth,
  moveSectionBack,
  removeSection,
  copySection,
  isMoveSectionBackDisabled,
  isMoveSectionForthDisabled,
} = useForm();

</script>
<template>
  <div class="flex gap-4 items-center">
    <div
      @click="item.required = !item.required"
      class="flex gap-4 items-center select-none border rounded-xl p-2 cursor-pointer shadow-sm"
    >
      <app-toggle
        v-model="item.required"
        class="pointer-events-none"
      ></app-toggle>
      <p class="text-xs">پاسخ الزامی</p>
    </div>
    <app-icon-btn icon="Trash" @click="removeSection(item.id)"></app-icon-btn>
    <app-icon-btn icon="Copy" @click="copySection(item.id)"></app-icon-btn>
    <app-icon-btn
      icon="ArrowUp"
      :disabled="isMoveSectionBackDisabled(item.id)"
      @click="moveSectionBack(item.id)"
    ></app-icon-btn>
    <app-icon-btn
      icon="ArrowDown"
      :disabled="isMoveSectionForthDisabled(item.id)"
      @click="moveSectionForth(item.id)"
    ></app-icon-btn>
  </div>
</template>

<script setup>
import useForm from "@/composables/form";
import FormFieldActions from "./FormFieldActions.vue";
import { reactive, ref } from "vue";
import FormFieldProperties from "./FormFieldProperties.vue";

const props = defineProps({
  item: { type: Object, required: true },
});

const { sectionTypes } = useForm();
// "title": "string",
//       "type": "string",
//       "required": true,
//       "properties": [
//         "string"
//       ]
</script>
<template>
  <app-card class="h-max mt-4 relative z-50">
    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <app-textfield
          placeholder="عنوان پرسش"
          class="w-64"
          v-model="item.title"
        ></app-textfield>
        <app-select
          :options="sectionTypes"
          v-model="item.type"
          class="w-40"
        ></app-select>
      </div>
      <FormFieldActions :item="item" />
    </div>
    <FormFieldProperties :item="item" />
  </app-card>
</template>

<script setup>
import useForm from "@/composable/form";
import AppSelect from "../global/form/AppSelect.vue";

const props = defineProps({});

const { form } = useForm();
</script>
<template>
  <app-card height="300px">
    <app-textfield
      title="نام فرم"
      v-model="form.name"
      placeholder="یک عنوان برای این فرم"
    ></app-textfield>
    <AppSelect
      class="mt-4"
      :options="['عمومی', 'خصوصی']"
      v-model="form.category"
    />
  </app-card>
</template>

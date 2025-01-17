<script setup>
import useForm from "@/composables/form";

const props = defineProps({});

const { form, formTypes } = useForm();
</script>
<template>
  <app-card height="300px">
    <div class="flex gap-2">
      <app-textfield
        class="w-64"
        title="نام فرم"
        v-model="form.form_title"
        placeholder="یک عنوان برای این فرم"
        auto-focus="true"
      ></app-textfield>
      <app-select
        class="w-64"
        title="دسته بندی"
        :options="formTypes"
        v-model="form.form_type"
        :disabled="$route.name == 'updateForm'"
      />
    </div>
    <app-textarea
      v-model="form.description"
      title="توضیخات فرم"
      placeholder="توضیحاتی در مورد این فرم"
      class="mt-4"
      rows="7"
    />
  </app-card>
</template>

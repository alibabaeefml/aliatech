<script setup>
import FormItem from "@/components/forms/FormItem.vue";
import NoForm from "@/components/forms/NoForm.vue";
import TheAppbar from "@/components/global/layout/TheAppbar.vue";
import useForms from "@/composable/forms";
import { onMounted } from "vue";

const { forms, getForms } = useForms();

onMounted(() => {
  getForms();
});
</script>

<template>
  <TheAppbar>
    <template #actions>
      <app-btn
        class="text-xs font-normal flex items-center gap-2"
        @click="
          $router.push({
            name: 'createForm',
          })
        "
      >
        <app-icon name="Plus" color="white" size="14"></app-icon> ایجاد فرم
      </app-btn>
    </template>
  </TheAppbar>
  <app-card class="mt-6" height="500px">
    <ul class="grid grid-cols-3 gap-4" v-if="forms.length">
      <FormItem v-for="item in forms" :item="item" :key="item.id" />
    </ul>
    <NoForm v-else />
  </app-card>
</template>

<script setup>
import FormItem from "@/components/forms/FormItem.vue";
import FormItemSkeleton from "@/components/forms/FormItemSkeleton.vue";
import NoForm from "@/components/forms/NoForm.vue";
import TheAppbar from "@/components/global/layout/TheAppbar.vue";
import useForms from "@/composables/forms";
import { onMounted } from "vue";

const { forms, getForms, loading } = useForms();

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
    <ul class="grid sm:grid-cols-3 grid-cols-1 gap-4" v-if="forms.length">
      <FormItem v-for="item in forms" :item="item" :key="item.form_id" />
    </ul>
    <template v-else-if="loading">
      <ul class="grid sm:grid-cols-3 grid-cols-1 gap-4">
        <FormItemSkeleton v-for="item in 12" :key="item" />
      </ul>
    </template>
    <NoForm v-else />
  </app-card>
</template>

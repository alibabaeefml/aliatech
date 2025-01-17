<script setup>
import usePersianDate from "@/composables/persianDate";

const props = defineProps({
  item: { type: Object, required: true },
});
</script>
<template>
  <li class="p-2 rounded-xl h-64 border">
    <div
      class="flex items-center justify-center w-full h-32 bg-gray-100 rounded-xl"
    >
      <app-title :title="item.form_title"></app-title>
    </div>
    <div class="mt-6">
      <p class="text-neutral-300 text-xs">
        {{ usePersianDate(item.created_at) }}
      </p>
    </div>
    <app-btn
      class="flex items-center gap-2 w-full mt-4"
      theme="secondary"
      @click="
        $router.push({
          name: 'updateForm',
          params: {
            id: item.form_id,
          },
        })
      "
    >
      <app-icon name="Eye" :color="$colors.primary.DEFAULT"></app-icon>
      <p>مشاهده فرم</p>
    </app-btn>
  </li>
</template>

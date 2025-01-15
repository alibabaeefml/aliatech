<script setup>
import FormInfo from "@/components/create-update-form/FormInfo.vue";
import TheAppbar from "@/components/global/layout/TheAppbar.vue";
</script>
<template>
  <div>
    <TheAppbar>
      <template #actions>
        <app-btn class="text-xs font-normal flex items-center gap-2">
          <app-icon name="Check" color="white" size="14"></app-icon> ذخیره فرم
        </app-btn>
      </template>
    </TheAppbar>
    <div class="mt-6">
      <FormInfo />
    </div>
  </div>
</template>

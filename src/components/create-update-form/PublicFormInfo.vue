<script setup></script>
<template>
  <app-card >
    <div class="flex items-center gap-4">
      <app-textfield
        :disabled="true"
        title="نام خانوادگی"
        placeholder="پاسخ شما"
        class="w-64"
      ></app-textfield>
      <app-textfield
        :disabled="true"
        title="نام"
        placeholder="پاسخ شما"
        class="w-64"
      ></app-textfield>
    </div>
    <app-textfield
      :disabled="true"
      title="ایمیل"
      placeholder="پاسخ شما"
      class="w-64 mt-4"
    ></app-textfield>
  </app-card>
</template>

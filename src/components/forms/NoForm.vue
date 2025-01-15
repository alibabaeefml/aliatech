<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="text-sm flex gap-4">
      <p class="text-neutral-600">هیچ فرمی تا به حال ساخته نشده است!</p>
      <router-link :to="{ name: 'createForm' }" class="text-blue-500"
        >ایجاد فرم</router-link
      >
    </div>
  </div>
</template>

<template>
  <div class="flex justify-between items-center">
    <app-title :title="$route.meta.title" />
    <div class="flex items-center gap-4">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

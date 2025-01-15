<template>
  <div class="flex justify-between items-center">
    <app-title :title="$route.meta.title" />
    <slot name="actions"></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
});
</script>
<template>
  <li>{{ item }}</li>
</template>

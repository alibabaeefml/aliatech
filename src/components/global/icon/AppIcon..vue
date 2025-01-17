
<script setup>
import { defineProps, computed, defineAsyncComponent } from "vue";

// Define the component props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "black", // Default color is black
  },
  size: {
    type: [String, Number],
    default: "24", // Default size is 24px
  },
});

// Dynamically import the icon component based on the `name` prop using defineAsyncComponent
const iconName = computed(() => {
  return defineAsyncComponent(() =>
    import(`@/components/global/icon/${props.name}Icon.vue`)
  );
});

// Dynamically apply the color and size as inline styles
const iconStyle = computed(() => {
  return {
    color: props.color,
    fontSize: `${props.size}px`,
    width: `${props.size}px`,
    height: `${props.size}px`,
  };
});
</script>


<template>
    <component :is="iconName" :style="iconStyle"  />
</template>

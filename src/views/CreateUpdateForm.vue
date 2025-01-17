<script setup>
import FormField from "@/components/create-update-form/FormField.vue";
import FormInfo from "@/components/create-update-form/FormInfo.vue";
import TheAppbar from "@/components/global/layout/TheAppbar.vue";
import useForm from "@/composables/form";
const { form, addSection } = useForm();
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
      <transition-group name="list" tag="ul" v-if="form.sections.length">
        <FormField
          v-for="item in form.sections"
          :key="item.id"
          :item="item"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 200 },
          }"
          :animate="{ transition: { duration: 0.5 } }"
        />
      </transition-group>
      <app-card
        class="hover:brightness-90 cursor-pointer flex gap-2 items-center justify-center font-bold mt-6 sticky bottom-10 select-none"
        @click="addSection"
      >
        <app-icon name="Plus"></app-icon>
        <p>پرسش جدید</p>
      </app-card>
    </div>
  </div>
</template>

<style scoped>
.list-move {
  transition: transform 0.3s ease-in-out;
}
</style>

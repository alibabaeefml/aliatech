<script setup>
import FormField from "@/components/create-update-form/FormField.vue";
import FormInfo from "@/components/create-update-form/FormInfo.vue";
import FormLoading from "@/components/create-update-form/FormLoading.vue";
import PublicFormInfo from "@/components/create-update-form/PublicFormInfo.vue";
import TheAppbar from "@/components/global/layout/TheAppbar.vue";
import useForm from "@/composables/form";
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const {
  form,
  addSection,
  createForm,
  deleteForm,
  updateForm,
  getForm,
  loading,
  formLoading,
  resetForm,
  isCreateFormDisabled,
} = useForm();

const route = useRoute();

onMounted(() => {
  if (route.params.id) {
    getForm(route.params.id);
  }
});
onUnmounted(() => {
  resetForm();
});
</script>
<template>
  <FormLoading v-if="formLoading" />
  <div v-else>
    <TheAppbar>
      <template #actions>
        <app-btn
          class="text-xs font-normal flex items-center gap-2 w-32"
          @click="deleteForm(route.params.id)"
          v-if="$route.name == 'updateForm'"
          :loading="loading"
        >
          <app-icon name="Trash" color="white" size="14"></app-icon> حذف فرم
        </app-btn>

        <app-btn
          class="text-xs font-normal flex items-center gap-2 w-32"
          @click="createForm"
          v-if="$route.name == 'createForm'"
          :loading="loading"
          :disabled="isCreateFormDisabled"
        >
          <app-icon name="Check" color="white" size="14"></app-icon> ذخیره فرم
        </app-btn>
        <app-btn
          class="text-xs font-normal flex items-center gap-2 w-32"
          @click="updateForm(route.params.id)"
          v-if="$route.name == 'updateForm'"
          :loading="loading"
        >
          <app-icon name="Check" color="white" size="14"></app-icon> ویرایش فرم
        </app-btn>
      </template>
    </TheAppbar>
    <div class="mt-6">
      <FormInfo />
      <PublicFormInfo class="mt-4" v-if="form.form_type == 'public'" />
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
        v-if="!loading"
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

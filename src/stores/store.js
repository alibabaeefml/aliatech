import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
  const vars = ref({
    form: {
      form_type: null,
      form_title: null,
      description: null,
      sections: [],
    },
  });
  return { vars };
});

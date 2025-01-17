import { ref } from "vue";
import { useRepository } from "./repository";

export default function useForms() {
  const forms = ref([]);
  const mainRepo = useRepository("main");
  const loading = ref();
  async function getForms() {
    try {
      loading.value = true;
      let res = await mainRepo.getForms();
      if (res.data) {
        forms.value = res.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  return {
    forms,
    getForms,
    loading,
  };
}

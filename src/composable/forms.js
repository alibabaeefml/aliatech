import { ref } from "vue";
import { useRepository } from "./repository";

export default function useForms() {
  const forms = ref([]);
  const mainRepo = useRepository("main");
  async function getForms() {
    await mainRepo.getForms();
  }
  return {
    forms,
    getForms,
  };
}

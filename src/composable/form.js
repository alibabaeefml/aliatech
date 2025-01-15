import { ref } from "vue";
import { useRepository } from "./repository";

export default function useForm() {
  const form = ref({
    category: null,
    name: null,
  });
  const mainRepo = useRepository("main");
  async function createForm() {
    let res = await mainRepo.createForm(form.value);
  }
  return {
    form,
    createForm,
  };
}

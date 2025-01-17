import { computed, nextTick, reactive, ref } from "vue";
import { useRepository } from "./repository";
import useRandomId from "./randomId";
import { useStore } from "@/stores/store";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

export default function useForm() {
  const form = reactive(useStore().vars.form);

  const formTypes = ref([
    {
      title: "عمومی",
      value: "public",
    },
    {
      title: "خصوصی",
      value: "private",
    },
  ]);

  const sectionTypes = ref([
    { title: "پاسخ کوتاه", value: "text" },
    { title: "پاسخ بلند", value: "textarea" },
    { title: "تک پاسخی", value: "radio" },
    { title: "چندین پاسخی", value: "checkbox" },
    { title: "لیست انتخابی", value: "dropdown" },
    { title: "بارگذاری پیوست", value: "file" },
  ]);
  const loading = ref();
  const formLoading = ref();
  const router = useRouter();
  const isCreateFormDisabled = computed(() => {
    switch (true) {
      case !form.form_title:
        return true;
      case !form.form_type:
        return true;

      default:
        return false;
    }
  });
  function getSectionIndexById(id) {
    if (!form.sections.length) return;
    return form.sections.indexOf(
      form.sections.find((section) => section.id == id)
    );
  }

  const isMoveSectionBackDisabled = (id) => {
    const sectionIndex = getSectionIndexById(id);
    return !form.sections[sectionIndex - 1];
  };

  const isMoveSectionForthDisabled = (id) => {
    const sectionIndex = getSectionIndexById(id);
    return !form.sections[sectionIndex + 1];
  };

  const mainRepo = useRepository("main");

  function addSection() {
    const id = useRandomId();
    form.sections.push({
      id,
      title: null,
      type: null,
      required: null,
      properties: [],
    });
  }
  function removeSection(id) {
    form.sections = form.sections.filter((section) => section.id !== id);
  }

  function copySection(id) {
    const sectionIndex = getSectionIndexById(id);

    if (sectionIndex < 0 || sectionIndex >= form.sections.length) return;

    const newId = useRandomId();

    const newSection = JSON.parse(JSON.stringify(form.sections[sectionIndex]));
    newSection.id = newId;

    form.sections = [
      ...form.sections.slice(0, sectionIndex + 1),
      newSection,
      ...form.sections.slice(sectionIndex + 1),
    ];
  }

  async function moveSectionBack(id) {
    const sectionIndex = getSectionIndexById(id);
    if (sectionIndex > 0 && sectionIndex < form.sections.length) {
      [form.sections[sectionIndex], form.sections[sectionIndex - 1]] = [
        form.sections[sectionIndex - 1],
        form.sections[sectionIndex],
      ];
    }
    await nextTick();
  }
  async function moveSectionForth(id) {
    const sectionIndex = getSectionIndexById(id);

    if (sectionIndex >= 0 && sectionIndex < form.sections.length - 1) {
      [form.sections[sectionIndex], form.sections[sectionIndex + 1]] = [
        form.sections[sectionIndex + 1],
        form.sections[sectionIndex],
      ];
    }
    await nextTick();
  }

  function resetForm() {
    form.form_title = null;
    form.form_type = null;
    form.description = null;
    form.sections = [];
  }
  async function getForm(id) {
    try {
      formLoading.value = true;
      let res = await mainRepo.getForm(id);
      if (res) {
        form.form_title = res.form_title;
        form.form_type = res.form_type;
        form.description = res.description;
        form.sections = res.sections;
      }
    } catch (error) {
      console.error(error);
    } finally {
      formLoading.value = false;
    }
  }
  async function createForm() {
    try {
      loading.value = true;
      let res = await mainRepo.createForm(form);
      if (res) {
        router.push({ name: "forms" });
        toast.success("ساخت فرم با موفقیت انجام شد");
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  async function updateForm(id) {
    try {
      loading.value = true;
      let res = await mainRepo.updateForm(id, form);
      if (res) {
        router.push({ name: "forms" });
        toast.success("ویرایش فرم با موفقیت انجام شد");
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  async function deleteForm(id) {
    try {
      loading.value = true;
      let res = await mainRepo.deleteForm(id);
      if (res) {
        router.push({ name: "forms" });
        toast.success("حذف فرم با موفقیت انجام شد");
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    formLoading,
    loading,
    form,
    createForm,
    updateForm,
    deleteForm,
    getForm,
    formTypes,
    addSection,
    removeSection,
    sectionTypes,
    moveSectionBack,
    moveSectionForth,
    copySection,
    isCreateFormDisabled,
    isMoveSectionBackDisabled,
    isMoveSectionForthDisabled,
    resetForm,
  };
}

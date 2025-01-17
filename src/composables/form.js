import { computed, nextTick, reactive, ref } from "vue";
import { useRepository } from "./repository";
import useRandomId from "./randomId";
import { useStore } from "@/stores/store";

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

  async function createForm() {
    let res = await mainRepo.createForm(form);
  }

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

  // function resetForm() {
  //   form = {
  //     form_type: null,
  //     form_title: null,
  //     description: null,
  //     sections: [],
  //   };
  // }
  return {
    form,
    createForm,
    formTypes,
    addSection,
    removeSection,
    // resetForm,
    sectionTypes,
    moveSectionBack,
    moveSectionForth,
    copySection,
    isMoveSectionBackDisabled,
    isMoveSectionForthDisabled,
  };
}

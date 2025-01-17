import AppBtn from "@/components/global/button/AppBtn.vue";
import AppIconBtn from "@/components/global/button/AppIconBtn.vue";
import AppCard from "@/components/global/card/AppCard.vue";
import AppCheckbox from "@/components/global/form/AppCheckbox.vue";
import AppFileInput from "@/components/global/form/AppFileInput.vue";
import AppForm from "@/components/global/form/AppForm.vue";
import AppRadio from "@/components/global/form/AppRadio.vue";
import AppSelect from "@/components/global/form/AppSelect.vue";
import AppTextArea from "@/components/global/form/AppTextArea.vue";
import AppTextField from "@/components/global/form/AppTextField.vue";
import AppToggle from "@/components/global/form/AppToggle.vue";
import AppIcon from "@/components/global/icon/AppIcon..vue";
import AppTitle from "@/components/global/text/AppTitle.vue";

export default function registerGlobalComponents(app) {
  app.component("app-card", AppCard);
  app.component("app-form", AppForm);
  app.component("app-textfield", AppTextField);
  app.component("app-select", AppSelect);
  app.component("app-textarea", AppTextArea);
  app.component("app-toggle", AppToggle);
  app.component("app-checkbox", AppCheckbox);
  app.component("app-radio", AppRadio);
  app.component("app-fileinput", AppFileInput);
  app.component("app-btn", AppBtn);
  app.component("app-title", AppTitle);
  app.component("app-icon", AppIcon);
  app.component("app-icon-btn", AppIconBtn);
}

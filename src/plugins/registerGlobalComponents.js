import AppButton from "@/components/global/button/AppButton.vue";
import AppCard from "@/components/global/card/AppCard.vue";
import AppForm from "@/components/global/form/AppForm.vue";
import AppTextField from "@/components/global/form/AppTextField.vue";

export default function registerGlobalComponents(app) {
  app.component("app-card", AppCard);
  app.component("app-form", AppForm);
  app.component("app-textfield", AppTextField);
  app.component("app-btn", AppBtn);
}

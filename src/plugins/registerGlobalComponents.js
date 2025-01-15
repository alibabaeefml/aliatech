import AppBtn from "@/components/global/button/AppBtn.vue";
import AppIconBtn from "@/components/global/button/AppIconBtn.vue";
import AppCard from "@/components/global/card/AppCard.vue";
import AppForm from "@/components/global/form/AppForm.vue";
import AppTextField from "@/components/global/form/AppTextField.vue";
import AppIcon from "@/components/global/icon/AppIcon..vue";
import AppTitle from "@/components/global/text/AppTitle.vue";

export default function registerGlobalComponents(app) {
  app.component("app-card", AppCard);
  app.component("app-form", AppForm);
  app.component("app-textfield", AppTextField);
  app.component("app-btn", AppBtn);
  app.component("app-title", AppTitle);
  app.component("app-icon", AppIcon);
  app.component("app-icon-btn", AppIconBtn);
}

import "./assets/style/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import registerGlobalComponents from "./plugins/registerGlobalComponents";
import tailwindConfig from "../tailwind.config";
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);

registerGlobalComponents(app);
app.use(MotionPlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");

app.config.globalProperties.$colors = tailwindConfig.theme.extend.colors;

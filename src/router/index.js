import { createRouter, createWebHistory } from "vue-router";
import paths from "./paths";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: paths,
});

router.beforeEach((to, from) => {
  if (to.meta.auth) {
    if (!localStorage.getItem("access_token")) {
      return { name: "auth" };
    }
  }
});
export default router;

export default [
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/",
    name: "forms",
    component: () => import("../views/FormsView.vue"),
  },
  {
    path: "/create-form",
    name: "createForm",
    component: () => import("../views/CreateUpdateForm.vue"),
  },
  {
    path: "/update-form",
    name: "updateForm",
    component: () => import("../views/CreateUpdateForm.vue"),
  },
];

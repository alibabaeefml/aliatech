export default [
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
    meta: {
      title: "اعتبارسنجی",
    },
  },
  {
    path: "/",
    name: "forms",
    component: () => import("../views/FormsView.vue"),
    meta: {
      title: "فرم ها",
    },
  },
  {
    path: "/create-form",
    name: "createForm",
    component: () => import("../views/CreateUpdateForm.vue"),
    meta: {
      title: "ساخت فرم",
    },
  },
  {
    path: "/update-form",
    name: "updateForm",
    component: () => import("../views/CreateUpdateForm.vue"),
    meta: {
      title: "ویرایش فرم",
    },
  },
];

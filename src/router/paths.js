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
      auth: true,
    },
  },
  {
    path: "/create-form",
    name: "createForm",
    component: () => import("../views/CreateUpdateForm.vue"),
    meta: {
      title: "ساخت فرم",
      auth: true,
    },
  },
  {
    path: "/update-form/:id",
    name: "updateForm",
    component: () => import("../views/CreateUpdateForm.vue"),
    meta: {
      title: "ویرایش فرم",
      auth: true,
    },
  },
];

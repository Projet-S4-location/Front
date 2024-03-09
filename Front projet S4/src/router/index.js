import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/test",
      name: "test",
      component: () => import("../views/test.vue"),
    },
    {
      path: "/test_calendar",
      name: "test_calendar",
      component: () => import("../views/test_calendar.vue"),
    },
    {
      path: "/connexion",
      name: "connexion",
      component: () => import("../views/connexion.vue"),
    },
    {
      path: "/item_shop",
      name: "item_shop",
      component: () => import("../views/item_shop.vue"),
    },
    {
      path: "/studio_shop",
      name: "studio_shop",
      component: () => import("../views/studio_shop.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/page_admin.vue"),
    },
  ],
});

export default router;

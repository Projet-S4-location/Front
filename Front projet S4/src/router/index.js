import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/test',
      name: 'test',
      component: () => import('../views/test.vue')
    },
    {
      path: '/test_calendar',
        name: 'test_calendar',
        component: () => import('../views/test_calendar.vue')
    },
    {
      path: '/connexion',
      name : 'connexion',
      component: () => import('../views/connexion.vue')
    },
    {
      path: '/item_shop',
      name : 'item_shop',
      component: () => import('../views/item_shop.vue')
    }
  ]
})

export default router

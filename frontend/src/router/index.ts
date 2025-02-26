import { createRouter, createWebHistory } from 'vue-router'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayout.middleware.ts";
import {AppLayoutsEnum} from "@/layouts/config/layouts.types.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        layout: AppLayoutsEnum.default,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        layout: AppLayoutsEnum.default,
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthPage.vue'),
      meta: {
        layout: AppLayoutsEnum.auth,
      }
    }
  ],
})
router.beforeEach(loadLayoutMiddleware)
export default router

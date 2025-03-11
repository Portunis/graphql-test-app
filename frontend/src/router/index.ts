import { createRouter, createWebHistory } from 'vue-router'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayout.middleware.ts";
import {AppLayoutsEnum} from "@/layouts/config/layouts.types.ts";
import {isAuthenticated} from "@/router/middleware/chechToken.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomeView.vue'),
      meta: {
        layout: AppLayoutsEnum.default,
        needsAuth: true,
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthPage.vue'),
      meta: {
        layout: AppLayoutsEnum.auth,
      }
    }
  ],
})
router.beforeEach(loadLayoutMiddleware)

router.beforeEach(async (to, from, next) => {
  if (to.meta.needsAuth && !(await isAuthenticated())) {
    next('/auth')
  } else {
    next()
  }
})
export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from './views/Login.vue'
import Boards from '@/views/Boards.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Board',
    component: Boards,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'Register') {
    next()
    return
  }

  const token = localStorage.getItem('token')
  if (!token) {
    next('/login')
  } else {
    next()
  }
})

export default router

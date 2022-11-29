import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/todolist',
    name: 'todo.list',
    component: () => import('../views/todolist/list.vue')
  },

  {
    path: '/todolist/create',
    name: 'todo.create',
    component: () => import('../views/todolist/form.vue')
  },
  
  {
    path: '/todolist/edit/:id',
    name: 'todo.edit',
    component: () => import('../views/todolist/form.vue')
  },

  {
    path: '/products',
    name: 'product.list',
    component: () => import('../views/products/list.vue')
  },

  {
    path: '/products/create',
    name: 'product.create',
    component: () => import('../views/products/form.vue')
  },

  {
    path: '/products/edit/:id',
    name: 'product.edit',
    component: () => import('../views/products/form.vue')
  },

  {
    path: '/users/edit/:id',
    name: 'user.edit',
    component: () => import('../views/users/form.vue')
  },

  {
    path: '/user',
    name: 'user.list',
    component: () => import('../views/users/list.vue')
  },

  {
    path: '/user/create',
    name: 'user.create',
    component: () => import('../views/users/form.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

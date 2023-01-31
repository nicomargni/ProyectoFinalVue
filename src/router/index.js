import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginApp from '../views/LoginApp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginApp',
    component: LoginApp
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/RegisterApp.vue')
  },
  {
    path: '/Productos',
    name: 'Productos',
    component: () => import('../views/ProductosView.vue')
  },
  {
    path: '/Info',
    name: 'Info',
    component: () => import('../views/InfoView.vue')
  },
  {
    path: '/Carrito',
    name: 'Carrito',
    component: () => import('../views/CarritoView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoadsIndex from '../views/Loads/LoadsIndex.vue'
import LoadsForm from '../views/Loads/LoadsForm.vue'
import OrdersIndex from '../views/Orders/OrdersIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loads',
      component: LoadsIndex
    },
    {
      path: '/loads/create',
      name: 'LoadsCreate',
      component: LoadsForm
    },
    {
      path: '/loads/:id/edit',
      name: 'LoadsEdit',
      component: LoadsForm
    },
    {
      path: '/loads/:id/orders',
      name: 'LoadsEdit',
      component: OrdersIndex
    }
  ]
})

export default router

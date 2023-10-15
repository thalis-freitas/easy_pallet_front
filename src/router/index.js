import { createRouter, createWebHistory } from 'vue-router'
import LoadsIndex from '../views/Loads/LoadsIndex.vue'
import LoadsForm from '../views/Loads/LoadsForm.vue'
import OrdersIndex from '../views/Orders/OrdersIndex.vue'
import OrdersForm from '../views/Orders/OrdersForm.vue'
import OrderProductsIndex from '../views/OrderProducts/OrderProductsIndex.vue'
import OrderProductsForm from '../views/OrderProducts/OrderProductsForm.vue'
import ProductsIndex from '../views/Products/ProductsIndex.vue'
import ProductsForm from '../views/Products/ProductsForm.vue'
import UsersIndex from '../views/Users/UsersIndex.vue'
import UsersForm from '../views/Users/UsersForm.vue'
import LoginForm from '../views/Auth/LoginForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Loads',
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
      path: '/loads/:load_id/orders',
      name: 'Orders',
      component: OrdersIndex
    },
    {
      path: '/loads/:load_id/orders/create',
      name: 'OrdersCreate',
      component: OrdersForm
    },
    {
      path: '/loads/:load_id/orders/:id/edit',
      name: 'OrdersEdit',
      component: OrdersForm
    },
    {
      path: '/orders/:order_id/order_products',
      name: 'OrderProductsIndex',
      component: OrderProductsIndex
    },
    {
      path: '/orders/:order_id/order_products/create',
      name: 'OrderProductsCreate',
      component: OrderProductsForm
    },
    {
      path: '/orders/:order_id/order_products/:id/edit',
      name: 'OrderProductsEdit',
      component: OrderProductsForm
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsIndex
    },
    {
      path: '/products/create',
      name: 'ProductsCreate',
      component: ProductsForm
    },
    {
      path: '/products/:id/edit',
      name: 'ProductsEdit',
      component: ProductsForm
    },
    {
      path: '/users',
      name: 'Usuários',
      component: UsersIndex
    },
    {
      path: '/users/create',
      name: 'UsersCreate',
      component: UsersForm
    },
    {
      path: '/users/:id/edit',
      name: 'UsersEdit',
      component: UsersForm
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'Login' && !token) next({ name: 'Login' })
  else next()
})

export default router

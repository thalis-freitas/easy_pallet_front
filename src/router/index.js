import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadsIndex from '../views/Loads/LoadsIndex.vue'
import LoadsCreate from '../views/Loads/LoadsCreate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/loads',
      name: 'loads',
      component: LoadsIndex
    },
    {
      path: '/loads/create',
      name: 'loadsCreate',
      component: LoadsCreate
    }
  ]
})

export default router

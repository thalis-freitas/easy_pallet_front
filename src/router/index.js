import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadsIndex from '../views/Loads/LoadsIndex.vue'
import LoadsForm from '../views/Loads/LoadsForm.vue'

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
      name: 'LoadsCreate',
      component: LoadsForm
    }
  ]
})

export default router

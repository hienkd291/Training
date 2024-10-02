import { createRouter, createWebHistory } from 'vue-router'
import Bai1 from '@/views/Bai1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/Bai1",
      name: "Bai1",
      component: Bai1,
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Particuliers from '../components/Particuliers.vue'
import Professionnels from '../components/Professionnels.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/particuliers', name: 'Particuliers', component: Particuliers },
  { path: '/professionnels', name: 'Professionnels', component: Professionnels },
]

const router = createRouter({
  history: createWebHistory(),
  routes,  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router

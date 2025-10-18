import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../components/Home.vue'
import Particuliers from '../components/Particuliers.vue'
import Professionnels from '../components/Professionnels.vue'
import Apropos from '../components/Apropos.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/particuliers', name: 'Particuliers', component: Particuliers },
  { path: '/professionnels', name: 'Professionnels', component: Professionnels },
  { path: '/apropos', name: 'Apropos', component: Apropos }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) return false
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  // Only start progress if the path (without hash) changes
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    NProgress.done()
  }
})



export default router

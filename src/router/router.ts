import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Particuliers from '../components/Particuliers.vue'
import Professionnels from '../components/Professionnels.vue'
/*import type { RouterScrollBehavior } from 'vue-router';

// define scrollBehavior properly
const scrollBehavior: RouterScrollBehavior = (to,  _from, savedPosition) => {
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    };
  }
  if (savedPosition) {
    return savedPosition;
  }
  return { top: 0 };
};*/

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/', name: 'Acceuil', component: Home },
  { path: '/particuliers', name: 'Particuliers', component: Particuliers },
  { path: '/professionnels', name: 'Professionnels', component: Professionnels },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Prevent auto-scroll when navigating to hash
    if (to.hash) {
      return false
    }
    return savedPosition || { top: 0 }
  }, // use the properly typed function
});

export default router;

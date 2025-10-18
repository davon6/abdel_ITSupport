<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const isLoading = ref(true)
const router = useRouter()

// Initial load
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800) // fake loading time, or tie to actual data fetching
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    isLoading.value = true
  }
  next()
})

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    setTimeout(() => {
      isLoading.value = false
    }, 1200)
  }
})

</script>

<template>
  <div>
    <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <Transition name="fade" mode="out-in">
      <router-view v-if="!isLoading" />
    </Transition>
  </div>
    <AppHeader />
   
    <FooterComponent />
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #e6f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.spinner {
  border: 6px solid #cce0ff;      /* slightly thicker */
  border-top: 6px solid #3b82f6;  /* same for top color */
  border-radius: 50%;
  width: 80px;                     /* bigger diameter */
  height: 80px;
  animation: spin 0.8s linear infinite;
}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

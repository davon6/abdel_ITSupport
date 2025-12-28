<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
//import FooterComponent from '@/components/FooterComponent.vue'
import TarifModal from '@/components/TarifModal.vue'
import ChatWidget from './components/ChatWidget.vue'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const showTarifModal = ref(false)

const tarifs = ref([
  { category: "Dépannage & assistance", service: "Nettoyage, virus, bugs, lenteurs", detail: "PC/Mac, box Internet, imprimante, logiciel", prix: 49, unit: "€/h", location: "Intervention à distance / domicile (Lyon)" },
  { category: "Dépannage & assistance", service: "Dépannage express (dans la journée)", detail: "Intervention rapide", prix: 79, unit: "€/h", location: "Intervention à distance / domicile (Lyon)" },
  { category: "Maintenance & sécurité", service: "Forfait sérénité", detail: "Nettoyage régulier, antivirus, MAJ", prix: 14, unit: "€/mois", location: "-" },
  { category: "Maintenance & sécurité", service: "Sécurisation ordinateur", detail: "Antivirus, pare-feu, nettoyage", prix: 69, unit: "€", location: "-" },
  { category: "Maintenance & sécurité", service: "Installation + configuration", detail: "-", prix: 59, unit: "€", location: "-" },
  { category: "Maintenance & sécurité", service: "Sauvegarde Cloud (5 Go inclus)", detail: "-", prix: 0, unit: "-", location: "-" },
  { category: "Services complémentaires", service: "Installation PC ou imprimante", detail: "À domicile, y compris configuration", prix: 59, unit: "€", location: "-" },
  { category: "Services complémentaires", service: "Transfert de données", detail: "Migration de données (USB, disque dur, cloud)", prix: 49, unit: "€", location: "-" },
  { category: "Services complémentaires", service: "Réinstallation complète (Windows/Mac)", detail: "Système, drivers, MAJ, antivirus", prix: 89, unit: "€", location: "-" },
]);

// ✅ Only show on this specific route
const showTarifButton = computed(() => {
  return route.name === 'Particuliers'
})

function openTarif() { showTarifModal.value = true }
function closeTarif() { showTarifModal.value = false }

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

watch(showTarifModal, (val) => {
  // toggle blur class
  document.body.classList.toggle('modal-open', val)

  // lock scroll
  if (val) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('wheel', preventScroll)
    document.removeEventListener('touchmove', preventScroll)
  }
  // optional: communicate to other components like your carousel
  if (!window.__isModalOpen) window.__isModalOpen = { value: false }
  window.__isModalOpen.value = val})

function preventScroll(e) {
  e.preventDefault()
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <Transition name="fade" mode="out-in">
      <router-view v-if="!isLoading" />
    </Transition>

    <AppHeader />
    <ChatWidget />

    <!--<FooterComponent />-->

    <teleport to="body" :style="{ zIndex: 9999999 }">
      <button
        @click="openTarif"
        class="tarif-btn"
        v-if="showTarifButton && !showTarifModal && !isLoading"
        :style="{
          position: 'fixed',
          top: '80%',
          left: '2rem',
          zIndex: 999999,
          pointerEvents: 'auto'
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <circle cx="12" cy="12" r="10" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
      Voir tarifs
      </button>

      <TarifModal
        :show="showTarifModal"
        :tarifs="tarifs"
        @close="closeTarif"
        :style="{
          position: 'fixed',
          top: '50%',
          left: '2rem',
          transform: 'translateY(-50%)',
          zIndex: 9999999,
          pointerEvents: 'auto'
        }"
      />
    </teleport>
  </div>
</template>
<style>

html, body {
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
  font-family: 'Open Sans', sans-serif;
}


body.modal-open #app {
  filter: blur(6px);
  transition: filter 0.3s ease;
}

.tarif-card,
.tarif-card * {
  filter: none !important;
  z-index: 999999 !important;
}

body.modal-open::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);
  z-index: 99998;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
#app {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

</style>
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
  border: 6px solid #cce0ff;
  border-top: 6px solid #3b82f6;
  border-radius: 50%;
  width: 80px;
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

.tarif-btn {
  background-color: #3b82f6;
  color: white;
  border-radius: 50px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  opacity: 0.84;
}

.tarif-btn svg {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes non-linear-burst {
  0% { transform: translate(0, 0); }
  25% { transform: translate(3px, -5px); }
  50% { transform: translate(-6px, 6px); }
  75% { transform: translate(4px, -3px); }
  100% { transform: translate(0, 0); }
}

.tarif-btn:hover {
  animation: non-linear-burst 1s ease-in-out infinite;
}

body.modal-open #app {
  filter: blur(6px);
  transition: filter 0.3s ease;
}

body.modal-open::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);
  z-index: 99998;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>

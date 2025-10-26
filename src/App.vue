<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import TarifModal from '@/components/TarifModal.vue'

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

 // adjust route name
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
    <teleport to="body">
  <button
    @click="openTarif"
    class="tarif-btn"
          v-if="showTarifButton && !showTarifModal && !isLoading"
    :style="{
      position: 'fixed',
      top: '50%',
      left: '2rem',
      transform: 'translateY(-50%)',
      zIndex: 999999,   // way above everything
      pointerEvents: 'auto'
    }"
  >
    💶 Voir tarifs
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
      zIndex: 9999999,   // way above everything
      pointerEvents: 'auto'
    }"
  />
</teleport>



  </div>
</template>

<style>
/*
.modal-open *:not(.tarif-card) {
  filter: blur(4px);
  transition: filter 0.3s ease;
}*/
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


.tarif-btn {
  position: fixed;
  z-index: 99999; 
  pointer-events: auto;
}

@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

</style>

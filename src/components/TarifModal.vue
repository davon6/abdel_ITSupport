<template>
    <teleport to="body">
      <transition name="fade-slide">
        <div v-if="show" class="fixed inset-0 flex items-center justify-center pointer-events-auto">
          <div
            class="tarif-card relative bg-gradient-to-br from-blue-100 to-blue-300 rounded-3xl shadow-3xl p-4 max-w-[90%] w-[95%] pointer-events-auto"
          >
            <!-- Modal header with title and close button -->
            <div class="flex justify-between items-center w-full mb-3 p-2">
             
              <button
                @click="$emit('close')"
                class="close-btn absolute top-0 right-0 text-white hover:text-gray-200 text-2xl font-bold"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
  
            <!-- Modal content -->
            <div class="overflow-y-auto max-h-[65vh] space-y-6">
              <!-- Group services by category -->
              <div v-for="(group, category) in groupedTarifs" :key="category">
                <h3 class="text-lg font-semibold text-blue-700 mb-3">{{ category }}</h3>
  
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <!-- Loop through services in each category -->
                  <div v-for="(service, index) in group" :key="index" class="service-card p-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <h4 class="text-sm font-bold text-blue-800 mb-1">{{ service.service }}</h4>
                    <p class="text-xs text-gray-700 mb-3">{{ service.detail }}</p>
                    <div class="flex justify-between text-gray-800">
                      <span class="text-xs">{{ service.prix }} {{ service.unit }}</span>
                      <span class="text-xs">{{ service.location }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    show: Boolean,
    tarifs: Array
  })
  
  // Group tarifs by category
  const groupedTarifs = computed(() => {
    return props.tarifs.reduce((groups, tarif) => {
      if (!groups[tarif.category]) {
        groups[tarif.category] = [];
      }
      groups[tarif.category].push(tarif);
      return groups;
    }, {});
  });
  </script>
  
  <style scoped>
  /* 🔮 MODAL BACKDROP CARD — Soft Glass + Glow */
  .tarif-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    width: 95%;
    max-width: 1000px;
    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(16px);
    border-radius: 1.8rem;
    box-shadow:
      0 18px 35px rgba(0,0,0,0.15),
      0 0 35px rgba(255,200,200,0.10),
      0 0 28px rgba(180,230,255,0.12);
    animation: modalPulse 5s ease-in-out infinite alternate;
    padding: 1.4rem 1.6rem;
    z-index: 999999;
    pointer-events: auto;
    overflow: hidden;
    max-height: none;
    height: auto;
  }
  
  /* Background pulse animation */
  @keyframes modalPulse {
    0% {
      background: rgba(255,255,255,0.35);
      box-shadow:
        0 18px 35px rgba(0,0,0,0.15),
        0 0 35px rgba(255,200,200,0.12),
        0 0 22px rgba(180,230,255,0.10);
    }
    100% {
      background: rgba(255,255,255,0.45);
      box-shadow:
        0 18px 38px rgba(0,0,0,0.2),
        0 0 38px rgba(180,220,255,0.15),
        0 0 25px rgba(255,180,220,0.12);
    }
  }
  
  /* ✨ APPEAR TRANSITION */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  
  /* 🎀 Close Button — tiny floating variant */
  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(8px);
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #3b4eb7;
    cursor: pointer;
    opacity: 0.8;
    z-index: 10;
    transition: transform 0.2s ease, background 0.2s ease, opacity 0.2s ease;
  }
  .close-btn:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.85);
    opacity: 1;
  }
  
  /* 🌸 CATEGORY TITLE */
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #3b4eb7;
    margin-bottom: 0.7rem;
    text-shadow: 0 1px 5px rgba(100,130,255,0.15);
  }
  
  /* 💎 MINI SERVICE CARDS (tiny-box inspired, compact) */
  .service-card {
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 0.4rem 0.8rem;
    border: 1px solid rgba(66,133,244,0.25);
    box-shadow:
      0 0 10px rgba(66,133,244,0.12),
      0 3px 12px rgba(0,0,0,0.06);
    font-size: 0.85rem;
    line-height: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition:
      transform 0.25s cubic-bezier(0.25,1,0.5,1),
      box-shadow 0.25s ease,
      filter 0.25s ease;
  }
  .service-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow:
      0 0 15px rgba(66,133,244,0.18),
      0 5px 18px rgba(0,0,0,0.1);
    filter: brightness(1.03);
  }
  
  /* 📝 Service title inside mini-card */
  .service-card h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e3a8a;
    margin-top: 0;
    margin-bottom: 0.25rem;
  }
  
  /* ✏️ Service details */
  .service-card p {
    font-size: 0.75rem;
    color: #4a4a4a;
    margin: 0 0 0.3rem 0;
  }
  
  /* SMALL TEXT */
  .text-xs {
    font-size: 0.78rem;
    color: #2d3a5f;
  }
  
  /* GRID LAYOUT — horizontal rows */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.2rem;
  }
  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
  
  /* Remove forced vertical spacing between categories */
  .space-y-6 > * {
    margin-bottom: 1.2rem;
  }
  
  /* Remove internal scroll constraint */
  .overflow-y-auto {
    max-height: none !important;
    overflow-y: visible !important;
  }
  </style>
  
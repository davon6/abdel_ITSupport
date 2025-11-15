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
  /* Modal card container */
/* Modal card container with background opacity */
.tarif-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 85%;
  max-height: 95vh;
  background: rgba(255, 255, 255, 0.15); /* White background with 0.15 opacity */
  border-radius: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  z-index: 999999 !important;
  overflow: hidden;
  padding-bottom: 10px;  /* Small space at the bottom */
}

/* Transition animation for modal appearance */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;  /* Smooth fade and slide transition */
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);  /* Start with a slide-up effect */
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);  /* Final state with normal opacity */
}

  
  /* Styling for category title */
  h3 {
    font-size: 1.25rem;  /* Shrink the category title */
    color: #0051a0;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  /* Service card styles */
  .service-card {
    background-color: white;
    padding: 0.75rem;  /* Reduced padding */
    border-radius: 0.75rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .service-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  h4 {
    font-size: 0.275rem;  /* Smaller font size for the service name */
    font-weight: 600;
    color: #0051a0;
  }
  
  p {
    font-size: 0.75rem;  /* Smaller font size for the service details */
    color: #555;
    margin-bottom: 10px;
  }
  
  button.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    color: #4913ad;
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    transition: color 0.2s ease;
    opacity: 0.5;
  }
  
  button.close-btn:hover {
    color: #d1d1d1;
  }
  
  /* Grid layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));  /* Allow more cards per row */
    gap: 1rem;  /* Reduced gap between items */
  }
  
  .text-sm {
    font-size: 0.75rem;  /* Smaller font size */
  }
  
  .text-gray-700 {
    color: #4a4a4a;
  }
  
  .text-gray-800 {
    color: #333;
  }
  
  .text-blue-700 {
    color: #0051a0;
  }
  
  .text-blue-800 {
    color: #003f7d;
  }
  
  .text-lg {
    font-size: 1.125rem;
  }
  
  .space-y-6 > :not(:last-child) {
    margin-bottom: 1.5rem;  /* Reduced space between sections */
  }






/* Service card styles */
.service-card {
  background-color: white;
  padding: 0.3rem;  /* Reduced padding for the service card */
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  opacity: 0.95;  /* Slightly reduced opacity for a softer look */
}

.service-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

h4 {
  font-size: 0.875rem;  /* Reasonable font size for the service name */
  font-weight: 600;
  color: #0051a0;
  margin-bottom: 0.2rem;  /* Reduced margin below the service title (less space between title and details) */
}

p {
  font-size: 0.75rem;  /* Smaller font size for the service details */
  color: #555;
  margin-bottom: 0.5rem;  /* Reduced margin at the bottom of the paragraph */
}

/* Grid layout adjustments */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));  /* Allow more cards per row */
  gap: 0.75rem;  /* Reduced gap between items */
}


  </style>
  
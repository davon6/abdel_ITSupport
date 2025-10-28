<template>
  <teleport to="body">
    <transition name="fade-slide">
      <div v-if="show" class="fixed inset-0 flex items-center justify-center pointer-events-none" >
        <div
          class="tarif-card relative bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-[90%] pointer-events-auto"
        >
          <!-- Close button -->
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 text-red-500 hover:text-red-600 text-2xl"
            aria-label="Fermer"
          >
            ✕
          </button>

          <!-- Modal content -->
          <h2 class="text-2xl font-bold text-blue-600 mb-4 text-center">💶 Tarifs</h2>
          <div class="overflow-x-auto max-h-[70vh]">
            <table class="min-w-full border-collapse border-2 border-blue-600 text-left rounded-lg overflow-hidden">
              <thead class="bg-yellow-100 sticky top-0">
                <tr>
                  <th class="px-3 py-2 border-2 border-blue-600">Catégorie</th>
                  <th class="px-3 py-2 border-2 border-blue-600">Service</th>
                  <th class="px-3 py-2 border-2 border-blue-600">Détail</th>
                  <th class="px-3 py-2 border-2 border-blue-600">Prix</th>
                  <th class="px-3 py-2 border-2 border-blue-600">Lieu</th>
                </tr>
              </thead>
              <tbody class="bg-green-100">
                <tr v-for="(item, i) in tarifs" :key="i" class="hover:bg-pink-200 transition">
                  <td class="px-3 py-2 border-2 border-blue-600">{{ item.category }}</td>
                  <td class="px-3 py-2 border-2 border-blue-600">{{ item.service }}</td>
                  <td class="px-3 py-2 border-2 border-blue-600">{{ item.detail }}</td>
                  <td class="px-3 py-2 border-2 border-blue-600">{{ item.prix }} {{ item.unit }}</td>
                  <td class="px-3 py-2 border-2 border-blue-600">{{ item.location }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

  
  <script setup>
  const props = defineProps({
    show: Boolean,
    tarifs: Array
  })
  </script>
  
  <style scoped>

  .tarif-card {
  position: fixed;          /* critical */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 3xl;
  width: 90%;
  max-height: 70vh;
  overflow-y: auto;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  pointer-events: auto;
  z-index: 999999 !important;
}

  .fade-slide-enter-active {
    transition: all 0.3s ease;
  }
  .fade-slide-leave-active {
    transition: all 0.2s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>
  
<template>
    <CommonBaseModal :show="show" :tarifs="tarifs" @close="$emit('close')">
  <div v-for="section in sections" :key="section.id" :id="section.id" class="mb-6">
    <h3 class="text-lg font-semibold text-blue-700 mb-3">{{ section.label }}</h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div v-for="service in groupedTarifs[section.id] || []" :key="service.service" class="service-card p-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <h4 class="text-sm font-bold text-blue-800 mb-1">{{ service.service }}</h4>
        <p class="text-xs text-gray-700 mb-3">{{ service.detail }}</p>
        <div class="flex justify-between text-gray-800">
          <span class="text-xs">{{ service.prix }} {{ service.unit }}</span>
          <span class="text-xs">{{ service.location }}</span>
        </div>
      </div>
    </div>
  </div>
</CommonBaseModal>

  </template>
  
  <script setup>
  import { defineProps,  ref, nextTick, watch } from 'vue'
  import CommonBaseModal from './CommonBaseModal.vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  show: Boolean,
  tarifs: Array
})

// access route to get hash
const route = useRoute()

// function to scroll to section
function scrollToHash() {
  nextTick(() => {
    const hash = route.hash.replace('#', '')
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

watch(() => props.show, (val) => {
  if (val) scrollToHash()
})


// watch route hash
watch(() => route.hash, () => scrollToHash())
</script>

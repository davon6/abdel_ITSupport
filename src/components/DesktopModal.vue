<template>
    <CommonBaseModal :show="show" :tarifs="tarifs" @close="$emit('close')">
      <div v-for="(group, category) in groupedTarifs" :key="category">
        <h3 class="text-lg font-semibold text-blue-700 mb-3">{{ category }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
    </CommonBaseModal>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import CommonBaseModal from './CommonBaseModal.vue'
  
  const props = defineProps({
    show: Boolean,
    tarifs: Array
  })
  </script>
  
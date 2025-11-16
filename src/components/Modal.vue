<template>
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-container">
  
        <button class="close-btn" @click="$emit('close')">✕</button>
  
        <div class="modal-body">
          <!-- IMAGE POP -->
          <div class="modal-image-wrapper">
            <img v-if="image" :src="image" :alt="title" class="modal-image"/>
          </div>
  
          <!-- SECTIONS HORIZONTALLY -->
          <div class="modal-sections">
            <div
              v-for="section in modalSections"
              :key="section.title"
              class="modal-section"
            >
              <h3>{{ section.title }}</h3>
              <ul>
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string
    image?: string
    modalSections: { title: string; items: string[] }[]
  }>()
  
  defineEmits(['close'])
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: auto;
    padding: 2rem;
    z-index: 9999;
  }
  
  .modal-container {
    background: white;
    max-width: 1100px;
    width: 100%;
    border-radius: 12px;
    padding: 2rem;
    position: relative;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: fadeIn 0.3s ease-out;
    top:10%
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  .modal-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
  }
  
  .modal-image-wrapper {
    flex: 0 0 250px;
    margin-top: -50px; /* pop outside modal */
  }
  
  .modal-image {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
    transform: translateY(-20px);
  }
  
  .modal-sections {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    flex: 1 1 600px;
    max-height: 75vh;
    overflow-y: auto;
  }
  
  .modal-section {
    flex: 1 1 45%;
    min-width: 280px;
  }
  
  .modal-section h3 {
    color: #007BFF;
    margin-bottom: 0.5rem;
  }
  
  .modal-section ul {
    padding-left: 1.2rem;
  }
  
  .modal-section li {
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .modal-body {
      flex-direction: column;
      align-items: center;
    }
  
    .modal-image-wrapper {
      margin-top: 0;
    }
  
    .modal-section {
      flex: 1 1 100%;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>
  
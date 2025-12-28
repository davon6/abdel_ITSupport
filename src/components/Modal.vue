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
    background: rgba(0, 0, 0, 0.65);
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
    border-radius: 14px;
    padding: 2rem;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
    animation: fadeIn 0.3s ease-out;
    top: 10%;
    border: 1px solid rgba(80, 90, 150, 0.12); /* subtle indigo */
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #555;
    transition: 0.2s;
  }
  .close-btn:hover {
    color: #3a4aa6;
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
    margin-top: -50px;
  }
  
  .modal-image {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    transform: translateY(-20px);
  }
  
  /* Keep the same layout fully */
  .modal-sections {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    flex: 1 1 600px;
    max-height: 75vh;
    overflow-y: auto;
  }
  
  /* Section container - subtle hint of color */
  .modal-section {
    flex: 1 1 45%;
    min-width: 280px;
    padding: 0.5rem 0.2rem;
    border-left: 3px solid rgba(60, 70, 150, 0.3); /* subtle indigo bar */
  }
  
  /* Header color: clean indigo-blue */
  .modal-section h3 {
    color: #3a4aa6;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  /* Remove bullets completely */
  .modal-section ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  
  /* New cleaner list style */
  .modal-section li {
    margin-bottom: 0.45rem;
    padding-left: 0.75rem;
    position: relative;
    line-height: 1.45;
    font-size: 0.97rem;
  }
  
  /* Tiny indigo bar instead of bullet, super minimal */
  .modal-section li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6rem;
    height: 4px;
    width: 4px;
    border-radius: 2px;
    background: #3a4aa6;
    opacity: 0.7;
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

  .modal-section ul {
  list-style: none !important;
  padding-left: 0 !important;
  margin: 0;
}

.modal-section li {
  margin-bottom: 0.55rem;
  line-height: 1.45;
  font-size: 0.97rem;

  /* remove *all* bullet/marker behavior */
  list-style-type: none !important;
  list-style: none !important;
  display: block;
}

.modal-section li::marker,
.modal-section li::before,
.modal-section li::after {
  content: none !important;
  display: none !important;
}


/* Force light mode colors */
.modal-container {
  background: #ffffff;
  color: #1c2b4a; /* text fallback for Opera iOS */
}

/* All headings (h1-h6), paragraphs, list items inside modal */
.modal-container h1,
.modal-container h2,
.modal-container h3,
.modal-container h4,
.modal-container h5,
.modal-container h6,
.modal-container p,
.modal-container li {
  color: #1c2b4a !important;
}

/* Optional: make links readable too */
.modal-container a {
  color: #0042a5 !important;
  text-decoration: underline;
}

/* Keep the existing blue for h3 */
.modal-section h3 {
  color: #3a4aa6 !important;
}

/* List bullet indicators */
.modal-section li::before {
  background: #3a4aa6 !important;
  opacity: 0.7;
}

  </style>
  
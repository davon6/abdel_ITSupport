<template>
    <div class="sections-wrapper">
      <div 
        v-for="(section, i) in sections" 
        :key="section.id" 
        :id="section.id" 
        class="section-card"
      >
        <h2 class="section-title">
          <component :is="sectionIcons[section.id]" class="icon" />
          {{ section.label }}
        </h2>
  
        <ul class="content-list">
          <li v-for="(line, idx) in section.content" :key="idx">
            {{ line }}
          </li>
        </ul>
  
        <hr class="separator" />
  
        <div class="details">
          <div v-for="(d, j) in section.details" :key="j" class="detail-chip">
            {{ d }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { sectionIcons } from "../data/sections";
  const props = defineProps({ sections: Array });
  </script>
  
  <style scoped>
  .sections-wrapper {
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    max-width: 680px;
    margin: auto;
  }
  
  .section-card {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 1.2rem;
    padding: 2rem;
    box-shadow: 0 10px 35px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .section-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  }
  
  .section-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e3a8a;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
  .icon {
    width: 1.6rem;
    height: 1.6rem;
    color: #3b82f6;
  }
  
  .content-list li {
    color: #374151;
    margin-bottom: 0.3rem;
    font-size: 0.98rem;
  }
  
  .separator {
    margin: 1.2rem 0;
    border: none;
    border-top: 1px solid rgba(0,0,0,0.08);
  }
  
  .details {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .detail-chip {
    background: #eff6ff;
    color: #1e40af;
    padding: 0.4rem 0.8rem;
    border-radius: 0.6rem;
    font-size: 0.85rem;
    border: 1px solid #bfdbfe;
  }

  .content-list {
  list-style: none;   /* remove bullets */
  padding-left: 0;    /* remove default left padding */
  margin: 0;          /* optional: remove default margin */
}
.content-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem; /* space between items */
}

.content-list li {
  position: relative;
  padding: 0.8rem 1rem;  /* vertical + horizontal padding */
  border-left: 3px solid #3b82f6; /* thin blue accent line */
  background: rgba(59, 130, 246, 0.05); /* very subtle blue background */
  border-radius: 0.6rem; 
  color: #1e3a8a;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

/* Optional: big tick icon on the left */
.content-list li::before {
  content: "✔";          /* big tick */
  font-size: 1.2rem;
  color: #3b82f6;
  flex-shrink: 0;
}

  </style>
  
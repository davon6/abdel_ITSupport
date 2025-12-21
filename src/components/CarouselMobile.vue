<template>
  <div class="mobile-wrapper px-0 sm:px-4 py-12 space-y-12">
    <div
      v-for="(section) in sections"
      :key="section.id"
       :id="section.id"
      class="card"
    >
      <h2 class="text-xl font-bold text-blue-600 mb-4 flex items-center justify-center space-x-2">
        <component :is="sectionIcons[section.id]" class="w-6 h-6" />
        <span>{{ section.label }}</span>
      </h2>
      
      <ul class="text-gray-700 text-sm space-y-1 text-center">
        <li v-for="(line, idx) in section.content" :key="idx">{{ line }}</li>
      </ul>

      <!-- mobile side details -->
      <div class="mobile-side-details">
        <hr class="mobile-separator" />
        <ul class="text-gray-600 text-sm space-y-1 mt-2">
          <li v-for="(detail, idx) in section.details" :key="`mobile-detail-${idx}`">
            {{ detail }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sections, sectionIcons } from '../data/sections'
</script>

<style scoped>
/* General layout and wrapper */
.mobile-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  background: white;
  border-radius: 1rem;
  border: 2px solid rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  padding: 1rem;   /* Keep the original padding as-is */
    margin-top: 2rem;  /* Add space above each card */
    margin-bottom: 2rem;  /* Add space below each card */
    box-shadow: none; /* No shadow for mobile */
    position: relative;
    z-index: 2;
}


.card:not(:last-child) {
    border-bottom: 1px solid rgba(66, 133, 244, 0.2); /* Light blue separator */
  }

.mobile-side-details {
  padding-top: 0.5rem;
}

.mobile-separator {
  border: none;
  height: 1px;
  background: rgba(66, 133, 244, 0.15);
  margin: 0.5rem 0;
  border-radius: 0.5px;
}

.mobile-side-details ul li {
  font-size: 0.875rem;
  color: #3b82f6;
}

/* Carousel section styles (removed as it's not relevant for mobile) */

/* Media queries for smaller screens */
@media (max-width: 600px) {
  .card {
    padding: 1rem;
    font-size: 0.9rem;
    box-shadow: none;
  }

  .mobile-side-details ul li {
    font-size: 0.875rem;
  }

  /* Simplify card and adjust layout for mobile */
  .carousel-item {
    width: 100%;
    max-width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }

  .card h2 svg {
    fill: #506fc5;
    width: 1.5rem;
    height: 1.5rem;
  }
}







  /* Add separator between cards (except the last card) */
  .card:not(:last-child) {
    margin-bottom: 1rem; /* Ensure there's a gap below the separator */
    position: relative;
  }

  .card:not(:last-child)::after {
    content: ''; /* Empty content to create separator */
    position: absolute;
    bottom: 0; /* Position at the bottom of the card */
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(66, 133, 244, 0.2); /* Light blue separator */
  }
  
@media (max-width: 600px) {
  .card h2 svg {
    filter: drop-shadow(0 0 6px rgba(66,133,244,0.35));
  }
}

@media (max-width: 600px) {
  .card {
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.95),
      rgba(240,248,255,0.85)
    );

    border: 1px solid rgba(66, 133, 244, 0.18);
    border-radius: 1.2rem;

    box-shadow:
      0 8px 20px rgba(0, 66, 165, 0.12),
      0 0 18px rgba(120, 180, 255, 0.18);

    backdrop-filter: blur(6px);
  }
}

@media (max-width: 600px) {
  .carousel-item:nth-child(odd) .card {
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.95),
      rgba(235,245,255,0.9)
    );
  }

  .carousel-item:nth-child(even) .card {
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.95),
      rgba(245,240,255,0.9)
    );
  }
}
@media (max-width: 600px) {
  .card h2 svg {
    filter: drop-shadow(0 0 6px rgba(66,133,244,0.35));
  }
}


@media (max-width: 600px) {
  .card {
    width: calc(100% + 2rem);
    margin-left: -1rem;
    margin-right: -1rem;
    border-radius: 1.2rem;
    max-width: 100%;
  }
}


</style>

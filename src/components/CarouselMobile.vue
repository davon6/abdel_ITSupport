<template>
    <div class="mobile-wrapper px-4 py-12 space-y-12">
      <div
        v-for="(section, i) in sections"
        :key="section.id"
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
  .mobile-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* reuse card styles from original CSS */
  .card {
    background: white;
    border-radius: 1rem;
    border: 2px solid rgba(0,0,0,0.05);
    padding: 1.5rem;
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
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


  .carousel-wrapper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
}

.vertical-bg {
  position: absolute; /* important */
  top: -4rem; 
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 760px;
  background:
   linear-gradient(180deg, rgba(255,255,255,0.35), rgba(32, 89, 174, 0.635));
  backdrop-filter: blur(10px);
  z-index: 0; /* behind carousel */
  pointer-events: none;

}

.perspective {
  position: fixed;
  left: 50%;              /* horizontally center */
  transform: translateX(-50%); /* adjust by half width */
  perspective: 1200px;
  z-index: 1;
  
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 0; 
}

.carousel-item {
  position: absolute;
  left: 50%;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: stretch; /* 👈 ensures card fills vertical space */
  width: 100%;          /* 👈 let card size itself */
  max-width: 500px;     /* 👈 cap width on large screens */
}

.card {
  flex: 1;              
  padding: 1.5rem;
  background: white;  /* keep content readable */
  border-radius: 1rem;
  border: 2px solid rgba(0,0,0,0.05); /* light playful border */
  box-shadow: 
    0 10px 25px rgba(0,0,0,0.15), 
    0 0 30px rgba(255, 200, 200, 0.08), /* soft pink glow */
    0 0 25px rgba(180, 230, 255, 0.08); /* soft blue glow */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;          
  min-width: 260px;     
  transition: all 0.35s ease;
  animation: cardAura 4s ease-in-out infinite alternate;
}

/* 🎨 subtle gradient pulse animation */
@keyframes cardAura {
  0% {
    background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,245,240,0.2) 100%);
    border-color: rgba(255,200,200,0.3);
    box-shadow:
      0 10px 25px rgba(0,0,0,0.15), 
      0 0 30px rgba(255,200,200,0.1),
      0 0 25px rgba(180,230,255,0.1);
  }
  50% {
    background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,250,255,0.2) 100%);
    border-color: rgba(180,230,255,0.3);
    box-shadow:
      0 10px 25px rgba(0,0,0,0.15), 
      0 0 30px rgba(200,230,200,0.1),
      0 0 25px rgba(220,200,255,0.1);
  }
  100% {
    background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,240,255,0.2) 100%);
    border-color: rgba(255,180,220,0.3);
    box-shadow:
      0 10px 25px rgba(0,0,0,0.15), 
      0 0 30px rgba(255,180,220,0.1),
      0 0 25px rgba(180,220,255,0.1);
  }
}


/*

old design


.card {
  flex: 1;             
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;          
  min-width: 260px;     
}

*/


@media (max-width: 600px) {
  .carousel-item {
    width: 100%;        /* 👈 full width on mobile */
    max-width: 90%;     /* 👈 keep some margin */
    left: 50%;
    transform: translateX(-50%);
  }
  .card {
    padding: 1rem;
    font-size: 0.9rem;  /* 👈 slightly smaller text if needed */
    box-shadow: none; 
  }

  
}
.active-item .card {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(155, 193, 232, 0.164);
  transition: all 0.3s;
}


.side-info {
  position: fixed; /* was absolute */
  width: 340px;
  z-index: 5;
  pointer-events: none;
  transition: top 0.3s ease, opacity 0.3s ease;
}

.side-box {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  max-height: 75vh;
  overflow-y: auto;
}
.side-left {
  left: calc(50% - 350px - 20px); /* 50% center - half carousel - margin */
}

.side-right {
  left: calc(50% + 350px + 20px); /* 50% center + half carousel + margin */
}
/* on small screens, move below */
.side-bottom {
  bottom: 1.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
}

/* fade animation */
.fade-side-enter-active,
.fade-side-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-side-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-side-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .side-left,
  .side-right,
  .tiny-box {
    display: none !important;
  }
}

.tiny {
  opacity: 0.95;
}


/* ✨ Base tiny-box styling */
.tiny-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(14px);
  border-radius: 0.9rem;
  padding: 0.65rem 1rem;
  font-size: 0.95rem;            /* 👈 slightly larger text */
  font-family: "Inter", "Arial", sans-serif; /* 👈 clean modern font */
  color: #1e3a8a;                /* blue-800 */
  width: 240px;
  box-shadow:
    0 0 10px rgba(66, 133, 244, 0.2),
    0 4px 20px rgba(0, 0, 0, 0.1); /* 👈 subtle glow + soft shadow */
  border: 1px solid rgba(66, 133, 244, 0.25); /* 👈 light blue frame */
  transition:
    transform 0.3s ease,
    opacity 0.4s ease,
    filter 0.4s ease;
  pointer-events: none;
  animation: tinyPop 0.4s ease forwards, gentleGlow 3s ease-in-out infinite;
}

/* 💨 Hover/focus aesthetic if you ever enable pointer-events */
.tiny-box:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
/* 🫧 Tiny boxes pop animation (no sliding, just scale & opacity) */
.fade-side-enter-active,
.fade-side-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.4s ease;
}

.fade-side-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.fade-side-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-side-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-side-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* 🫧 Give the tiny boxes a little “pop” on mount */
.tiny-box {
  animation: popIn 0.45s cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes popIn {
  0% {
    transform: scale(0.6);
    opacity: 0;
    filter: blur(4px);
  }
  60% {
    transform: scale(1.08);
    opacity: 1;
    filter: blur(0);
  }
  100% {
    transform: scale(1);
  }
}


/* 👌 Optional: a very soft pulsing glow if you want it alive */
@keyframes gentleGlow {
  0%, 100% {
    box-shadow:
      0 0 10px rgba(66, 133, 244, 0.2),
      0 4px 20px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow:
      0 0 16px rgba(66, 133, 244, 0.35),
      0 6px 25px rgba(0, 0, 0, 0.15);
  }
}
/* 💬 Font + border + background variations */
.tiny-box.variant-0 {
  font-family: "Inter", sans-serif;
  background: rgba(235, 245, 255, 0.95);   /* very light blue */
  border: 1px solid rgba(66, 133, 244, 0.35); /* bright blue */
  box-shadow: 0 0 12px rgba(66, 133, 244, 0.25), 0 4px 20px rgba(0,0,0,0.1);
}

.tiny-box.variant-1 {
  font-family: "Poppins", sans-serif;
  background: rgba(240, 235, 255, 0.95);   /* subtle lavender */
  border: 1px solid rgba(99, 102, 241, 0.35); /* indigo border */
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.25), 0 4px 20px rgba(0,0,0,0.1);
}

.tiny-box.variant-2 {
  font-family: "Nunito", sans-serif;
  background: rgba(230, 245, 255, 0.95);   /* soft cyan */
  border: 1px solid rgba(59, 130, 246, 0.35); /* light blue */
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.25), 0 4px 20px rgba(0,0,0,0.1);
}

.tiny-box.variant-3 {
  font-family: "Roboto Mono", monospace;
  background: rgba(220, 235, 255, 0.95);   /* slightly deeper sky */
  border: 1px solid rgba(147, 197, 253, 0.35); /* sky blue border */
  box-shadow: 0 0 12px rgba(147, 197, 253, 0.25), 0 4px 20px rgba(0,0,0,0.1);
}

/* 🌬️ Add subtle rotation / scale jitter */
.tiny-box.variant-0 { transform: rotate(-1.2deg) scale(1.00); }
.tiny-box.variant-1 { transform: rotate(1deg) scale(0.98); }
.tiny-box.variant-2 { transform: rotate(-0.8deg) scale(1.02); }
.tiny-box.variant-3 { transform: rotate(0.5deg) scale(1.01); }

/* mobile details section */
.mobile-side-details {
  padding-top: 0.5rem;
}

/* soft separator line */
.mobile-separator {
  border: none;
  height: 1px;
  background: rgba(66, 133, 244, 0.15); /* soft blue */
  margin: 0.5rem 0;
  border-radius: 0.5px;
}

/* optional: slightly smaller font for mobile details */
@media (max-width: 600px) {
  .mobile-side-details ul li {
    font-size: 0.875rem;
    color: #3b82f6; /* subtle blue from your color palette */
  }
}
.card h2 svg {
  fill: #506fc5; /* match your text-blue-600 */
  width: 1.5rem;
  height: 1.5rem;
}
  </style>
  
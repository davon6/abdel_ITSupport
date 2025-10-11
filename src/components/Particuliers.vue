<template>
  <div class="carousel-wrapper"  :style="{ minHeight: `${wrapperHeight}px` }">
    <div class="vertical-bg">
      
    </div>
    <div class="perspective sticky top-0  flex items-start justify-center">
      
      <div class="carousel">
        <div
          v-for="(section, i) in sections"
          :key="section.id"
          class="carousel-item"
          :style="getItemStyle(i)"
        >
          <div class="card">
            <h2 class="text-xl font-bold text-blue-600 mb-4">{{ section.label }}</h2>
            <ul class="text-gray-700 text-sm space-y-1 text-center">
              <li v-for="(line, idx) in section.content" :key="idx">{{ line }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted,defineExpose } from "vue";
import {  } from 'vue';


// Sections data
const sections = [
  { id: "depannage", label: "🔧 Dépannage", content: ["Réparation PC/Mac","Suppression virus","Optimisation","Réinstallation"] },
  { id: "installation", label: "📦 Installation", content: ["Installation périphériques","Configuration email","Wi-Fi setup"] },
  { id: "sauvegarde", label: "☁️ Sauvegarde", content: ["Sauvegarde Cloud/disque","Récupération","Clonage SSD"] },
  { id: "assistance", label: "📱 Assistance", content: ["Smartphones/tablettes","Connexion téléphone-PC","Apps utiles"] },
  { id: "formation", label: "🧓 Formation", content: ["Initiation informatique","Séances seniors","Sécurité numérique,Initiation informatique","Séances seniors","Sécurité numérique,Initiation informatique","Séances seniors","Sécurité numérique"] },
];

const total = sections.length;
const angle = 360 / total;            // rotation per card
const spacingFactor = 0.7;            // vertical spacing factor
const viewportHeight = ref(window.innerHeight);
const scrollY = ref(0);

const wrapperHeight = ref(0);



function handleResize() {
  viewportHeight.value = window.innerHeight;
  updateWrapperHeight();
}

// Lifecycle
onMounted(() => {
  updateWrapperHeight();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});

// Card dimensions
const cardHeight = ref(viewportHeight.value * 0.6);

// Style calculation
function updateWrapperHeight() {
  const spacing = spacingFactor * viewportHeight.value;
  const totalScroll = spacing * (total - 1);

  // sticky container must last all the scroll + one viewport so last card can center

wrapperHeight.value = spacing * (total - 1) + viewportHeight.value;
// good   wrapperHeight.value = spacing * (total - 1) + viewportHeight.value; 

}




function handleScroll() {
  const spacing = spacingFactor * viewportHeight.value;
  const maxScroll = spacing * (total - 1);
  scrollY.value = Math.min(window.scrollY, maxScroll);
}

function getItemStyle(i: number) {
  const spacing = spacingFactor * viewportHeight.value;
  const totalScroll = spacing * (total - 1);

  const scrollFactor = scrollY.value / totalScroll;

  const rotateY = -angle * i + scrollFactor * (angle * (total - 1));
  const translateY =
    i * spacing -
    scrollY.value +
    (viewportHeight.value / 2 - cardHeight.value / 2);

  // distance from current focus
  const focusDist = Math.abs(scrollY.value / spacing - i);

  // opacity (like before, but tied to distance)
  const opacity = 1 - Math.min(focusDist * 0.5, 0.7);

  // scale: shrink away
  const scale = 1 - Math.min(focusDist * 0.15, 0.4);

  // brightness: dim as it goes away
  const brightness = 1 - Math.min(focusDist * 0.3, 0.6);

  return {
    transform: `translateY(${translateY}px) rotateY(${rotateY}deg) translateZ(300px) scale(${scale})`,
    opacity,
    filter: `blur(${focusDist * 2}px) brightness(${brightness})`,
    transformOrigin: "center center",
    transition: "filter 0.3s, transform 0.3s, opacity 0.3s",
  };
}

defineExpose({ wrapperHeight });

</script>


<style scoped>
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
  width: 600px;
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
  flex: 1;              /* 👈 make card stretch inside carousel-item */
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;          /* 👈 fill container */
  min-width: 260px;     /* 👈 safeguard for very narrow mobiles */
}


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
  }
}


</style>

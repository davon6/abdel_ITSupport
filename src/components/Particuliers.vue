<template>

  <div class="carousel-wrapper"  :style="{ minHeight: `${wrapperHeight}px` }">
  
  
  
    <div class="vertical-bg">
      
    </div>

 
    <div class="perspective sticky top-0  flex items-start justify-center">
      
      <div class="carousel">
        <div
          v-for="(section, i) in sections"
          :key="section.id"
          :id="section.id"   
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
  <!-- 👇 side info lives OUTSIDE the sticky -->
  <transition name="fade-side" mode="out-in">
    <div
  v-if="sections[activeIndex]"
  key="side-info"
  class="side-info"
  :style="{
    top: `${getSideTop(activeIndex)}px`,
    left: activeIndex % 2 === 0 ? `calc(50% - 350px - 20px)` : `calc(50% + 350px + 20px)`
  }"
>
<transition-group name="fade-side" tag="div">
  <div
    v-for="(detail, j) in sections[activeIndex].details"
    :key="`detail-${activeIndex}-${j}`"
    class="side-info tiny"
    :style="getTinyBoxStyle(activeIndex, j) as CSSProperties"
  >
    <div class="tiny-box">
      {{ detail }}
    </div>
  </div>
</transition-group>

    </div>
  </transition>

  </div>
  

</template>
<script setup lang="ts">

// Extend the Window interface to include __isModalOpen
declare global {
  interface Window {
    __isModalOpen?: { value: boolean };
  }
}
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import type { CSSProperties } from "vue";
import { useRoute } from 'vue-router'


const route = useRoute()

// 💡 Mobile detail toggle
const showMobileDetails = ref(false);

function toggleMobileDetails() {
  showMobileDetails.value = !showMobileDetails.value;
}
watch(
  () => route.hash,
  (newHash: string) => {
    if (newHash) {
      scrollToSection(newHash.substring(1))
    }
  },
  { immediate: true } // also handle initial load
)

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    // Find the section index by ID
    const index = sections.findIndex((s) => s.id === id)
    if (index >= 0) {
      const spacing = spacingFactor * viewportHeight.value
      const targetScroll = index * spacing
      smoothScrollTo(targetScroll, 500) // 👈 use your existing function
    }
  }
}

// Sections data
const sections = [
  { 
    id: "depannage", 
    label: "🔧 Dépannage", 
    content: ["Réparation PC/Mac","Suppression virus","Optimisation","Réinstallation"],
    details: [
      "Réparation de PC / Mac (système lent, bugs, écran bleu, etc.)",
      "Suppression de virus, malware, publicités",
      "Nettoyage et optimisation des performances",
      "Réinstallation complète ou mise à jour du système d’exploitation"
    ]
  },
  { 
    id: "installation", 
    label: "📦 Installation", 
    content: ["Installation périphériques","Configuration email","Wi-Fi setup"],
    details: [
      "Installation d’imprimantes, réseaux, périphériques, box Internet",
      "Mise en place du Wi-Fi à domicile",
      "Configuration de comptes (emails, cloud, antivirus)",
      "Installation de logiciels courants"
    ]
  },
  { 
    id: "sauvegarde", 
    label: "☁️ Sauvegarde", 
    content: ["Sauvegarde Cloud/disque","Récupération","Clonage SSD"],
    details: [
      "Sauvegarde automatique sur disque ou cloud",
      "Récupération de données perdues",
      "Clonage ou migration vers SSD",
      "Sécurisation (antivirus, pare-feu, contrôle parental)"
    ]
  },
  { 
    id: "assistance-mobile", 
    label: "📱 Assistance", 
    content: ["Smartphones/tablettes","Connexion téléphone-PC","Apps utiles"],
    details: [
      "Aide à l’utilisation de smartphones / tablettes",
      "Connexion téléphone–PC (sauvegarde, synchronisation)",
      "Installation d’applications utiles ou contrôle parental"
    ]
  },
  { 
    id: "formation", 
    label: "🧓 Formation", 
    content: ["Initiation informatique","Séances seniors","Sécurité numérique"],
    details: [
      "Initiation à l’informatique (email, Internet, Word…)",
      "Séances personnalisées pour seniors",
      "Sécurité numérique : éviter les arnaques en ligne"
    ]
  },
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
const isMobile = ref(window.innerWidth <= 600);
// Lifecycle
onMounted(async () => {
  // ✅ Your existing setup
  updateWrapperHeight();
  window.addEventListener("wheel", handleWheel, { passive: false });
  if (isMobile.value) {
    window.addEventListener("scroll", handleScrollMobile);
  } else {
    window.addEventListener("scroll", handleScroll);
  }
  window.addEventListener("resize", handleResize);

  // ✅ New hash-handling logic
  if (route.hash) {
    // Wait until the DOM is ready
    await nextTick();
    scrollToSection(route.hash.substring(1));
  }
});

onUnmounted(() => {
  window.removeEventListener("wheel", handleWheel);
  if (isMobile.value) {
    window.removeEventListener("scroll", handleScrollMobile);
  } else {
    window.removeEventListener("scroll", handleScroll);
  }
  window.removeEventListener("resize", handleResize);
});

function handleWheel(e: WheelEvent) {
  if (window.__isModalOpen?.value) return 
  e.preventDefault();
  const base = 1.2;
  const boost = Math.min(Math.abs(e.deltaY) / 100, 1);
  const factor = base + boost * 0.5;
  const target = window.scrollY + e.deltaY * factor;
  smoothScrollTo(target, 300); // 👈 reuse your smooth scroll here too
}


// Card dimensions
const cardHeight = ref(viewportHeight.value * 0.6);


function updateWrapperHeight() {
  const spacing = spacingFactor * viewportHeight.value;

  // The last card should end exactly at the bottom of the wrapper
  wrapperHeight.value = spacing * (total - 1) + cardHeight.value;
}



let scrollTimeout: number | null = null;
function handleScroll() {
  const spacing = spacingFactor * viewportHeight.value;
  const maxScroll = spacing * (total - 1);
  scrollY.value = Math.min(window.scrollY, maxScroll);

  // continuously update activeIndex
  activeIndex.value = Math.round(scrollY.value / spacing);

  // optional: keep snapping after scroll stops
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = window.setTimeout(() => {
    snapToClosest();
  }, 250);
}



// Add these at the top of your script

/*
function handleScrollMobile() {
  scrollY.value = Math.round(window.scrollY);

  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = window.setTimeout(() => {
    const spacing = spacingFactor * viewportHeight.value;
    const targetIndex = Math.round(scrollY.value / spacing);
    const targetScroll = targetIndex * spacing;

    if (Math.abs(scrollY.value - targetScroll) > 1) {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, 100); // slightly shorter delay
}*/

function handleScrollMobile() {
  scrollY.value = Math.round(window.scrollY);
  activeIndex.value = Math.round(scrollY.value / (spacingFactor * viewportHeight.value));
  
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = window.setTimeout(() => {
    const spacing = spacingFactor * viewportHeight.value;
    const targetIndex = Math.round(scrollY.value / spacing);
    const targetScroll = targetIndex * spacing;
    if (Math.abs(scrollY.value - targetScroll) > 1) {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, 100);
}

const activeIndex = ref(0);

function snapToClosest() {
  const spacing = spacingFactor * viewportHeight.value;
  const scrollPos = scrollY.value;

  // Find nearest index (round to nearest)
  const targetIndex = Math.round(scrollPos / spacing);

  activeIndex.value = targetIndex;

  const targetScroll = targetIndex * spacing;

  const distance = Math.abs(targetScroll - scrollPos);
  const duration = Math.max(distance / 2, 200); // ensure min duration

  smoothScrollTo(targetScroll, duration);
}




function smoothScrollTo(target: number, duration: number) {
  const start = window.scrollY;
  const change = target - start;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start + change * ease);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}


function getItemStyle(i: number) {
  const spacing = spacingFactor * viewportHeight.value;
  const totalScroll = spacing * (total - 1);

  const scrollFactor = scrollY.value / totalScroll;

  const rotateY = -angle * i + scrollFactor * (angle * (total - 1));
  const translateY =
  i * spacing -
  (isMobile.value ? Math.round(scrollY.value) : scrollY.value) +
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
/*
function getSidePosition(index: number) {
  if (isMobile.value) return 'side-bottom'

  const carouselHalf = 250; // half of max-width 500px
  const margin = 20;

  return index % 2 === 0
    ? `left: calc(50% - ${carouselHalf + margin}px);`
    : `left: calc(50% + ${carouselHalf + margin}px);`
}
*/

function getSideTop(index: number) {
  const spacing = spacingFactor * viewportHeight.value;
  const translateY = index * spacing - scrollY.value + (viewportHeight.value / 2 - cardHeight.value / 2);
  // clamp to top/bottom of viewport so it never goes outside
  const minTop = 20;
  const maxTop = viewportHeight.value - cardHeight.value - 20;
  return Math.max(minTop, Math.min(translateY, maxTop));
}

function getTinyBoxStyle(sectionIndex: number, detailIndex: number) {
  const spacing = spacingFactor * viewportHeight.value;
  const baseTop =
    sectionIndex * spacing -
    scrollY.value +
    (viewportHeight.value / 2 - cardHeight.value / 2);

  const perDetailOffset = 70; // vertical spacing between boxes
  const top = baseTop + detailIndex * perDetailOffset;

  // Adjust horizontal positions
  // Move both sides slightly toward the center for perfect visual balance
  const left =
    (sectionIndex + detailIndex) % 2 === 0
      ? "calc(50% - 380px - 140px)" // 👈 shifted 30px further left
      : "calc(50% + 340px - 50px)"; // 👈 pulled in 30px toward center

  // Clamp within viewport height range
  const minTop = 20;
  const maxTop = viewportHeight.value - 60;
  const clampedTop = Math.max(minTop, Math.min(top, maxTop));

  return {
    position: "fixed",
    top: `${clampedTop}px`,
    left,
    opacity: 1,
    zIndex: 5,
    pointerEvents: "none",
    transition: "top 0.3s ease, opacity 0.3s ease",
  };
}


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
  .side-right {
    display: none;
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
}

/* 💨 Hover/focus aesthetic if you ever enable pointer-events */
.tiny-box:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* ✨ Add slight breathing animation on entry */
@keyframes tinyPop {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* 🌬️ Fade / blur transitions when boxes appear/disappear */
.fade-side-enter-active,
.fade-side-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease, filter 0.45s ease;
}

.fade-side-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
  filter: blur(6px);
}
.fade-side-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
  filter: blur(6px);
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

.tiny-box {
  animation: tinyPop 0.4s ease forwards, gentleGlow 3s ease-in-out infinite;
}


</style>

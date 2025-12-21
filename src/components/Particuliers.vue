
<script setup lang="ts">
// Extend the Window interface to include __isModalOpen
declare global {
  interface Window {
    __isModalOpen?: { value: boolean };
  }
}
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import CarouselDesktop from '@/components/CarouselDesktop.vue'
import CarouselMobile from '@/components/CarouselMobile.vue'
import { sections } from '../data/sections'
import FooterForm from '@/components/FooterForm.vue'
// --- reactive state
const viewportHeight = ref(window.innerHeight)
const scrollY = ref(0)
const activeIndex = ref(0)
const cardHeight = ref(viewportHeight.value * 0.6)
const wrapperHeight = ref(0)
const spacingFactor = 0.7
const total = sections.length
const route = useRoute()
const isMobile = ref(window.innerWidth <= 600)

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



function handleResize() {
  viewportHeight.value = window.innerHeight;
  updateWrapperHeight();
}

// Lifecycle
onMounted(async () => {
  updateWrapperHeight();
  
  // Handle scroll for desktop and mobile separately
  if (isMobile.value) {
    // For mobile, just use default scroll behavior
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("scroll", handleScroll); // Remove scroll event for mobile
  } else {
    // Desktop: Attach wheel event and desktop scroll handler
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("scroll", handleScroll);
  }
  
  window.addEventListener("resize", handleResize);

  // Handle initial route hash
  if (route.hash) {
    await nextTick();
    scrollToSection(route.hash.substring(1));
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  
  // Clean up event listeners
  if (isMobile.value) {
    window.removeEventListener("scroll", handleScrollMobile); // Mobile scroll handler
  } else {
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("scroll", handleScroll);
  }
});


function handleWheel(e: WheelEvent) {
  if (window.__isModalOpen?.value) return e.preventDefault();
  const base = 1.2;
  const boost = Math.min(Math.abs(e.deltaY) / 100, 1);
  const factor = base + boost * 0.5;
  const target = window.scrollY + e.deltaY * factor;
  smoothScrollTo(target, 300); // 👈 reuse your smooth scroll here too
}


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






</script>

<template>
  <div class="carousel-wrapper" :style="{ minHeight: `${wrapperHeight}px` }">
    
    <!-- Left repeating side -->
    <div class="side-bg left"></div>

    <!-- Right repeating side -->
    <div class="side-bg right"></div>

    <!-- Center content -->
    <div class="vertical-bg"></div>

    <component
      :is="isMobile ? CarouselMobile : CarouselDesktop"
      :sections="sections"
      :scroll-y="scrollY"
      :active-index="activeIndex"
      :viewport-height="viewportHeight"
      :card-height="cardHeight"
    />
    <FooterForm class="footer-fix"/>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* prevent horizontal scroll */
}

.vertical-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(760px, 100vw);
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.35),
    rgba(32, 89, 174, 0.635)
  );
  backdrop-filter: blur(10px);
  z-index: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .vertical-bg {
    left: 0;
    transform: none;
    width: 100%;
    border-radius: 0;
    width: 100vw; /* force full viewport width */
  }
}



/* Side backgrounds */
.side-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 200px; /* adjust thickness */
  background-image: url("/17973908.jpg");
  background-size: auto 3200px; /* bigger vertical size -> fewer repeats */
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}

.side-bg.left {
  left: 0;
}

.side-bg.right {
  right: 0;
}

/* Footer stays on top */
.footer-fix {
  position: relative;
  z-index: 20;
}

/* Responsive: hide sides on mobile */
@media (max-width: 600px) {
  .side-bg {
    display: none;
  }

  .vertical-bg {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .carousel-wrapper {
    overflow-x: visible; /* allow full-width cards */
  }
}


</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Modal from "./Modal.vue"
import { services, type ServiceItem } from "../data/services"
import FooterForm from '@/components/FooterForm.vue'


const isMobile = ref(false)
const pathHeight = ref('2500px')

const selectedService = ref<ServiceItem | null>(null)
const openModal = (service: ServiceItem | null) => (selectedService.value = service)
const closeModal = () => (selectedService.value = null)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  AOS.init({ duration: 800, once: true })
  new Rellax('.rellax')

  const container = document.querySelector('main.container')
  if (container) pathHeight.value = container.scrollHeight + 'px'

  checkMobile()
  window.addEventListener('resize', checkMobile)

  const oldColor = document.body.style.backgroundColor
  document.body.style.backgroundColor = '#0042a5'

  onUnmounted(() => {
    document.body.style.backgroundColor = oldColor
  })
})
</script>
<template>
  <div class="fullpage">
    <section class="parallax-hero rellax" data-rellax-speed="-3">
      <div class="icon-wrapper">
        <div class="overlay"></div>
        <div class="container text-center hero-content">
          <h1>Services pour les Professionnels</h1>
          <p>Solutions fiables, adaptées et sécurisées pour TPE, PME, indépendants et professions libérales.</p>
        </div>
      </div>
    </section>

    <main class="container" id="services">
      <div class="background-path" :style="{ height: pathHeight }">
        <svg viewBox="0 0 500 2500" preserveAspectRatio="none">
          <path
            d="M250,0 
              C450,200 50,400 450,600
              C50,800 450,1000 50,1200
              C450,1400 100,1600 400,1800
              C100,2000 450,2200 150,2400"
            fill="none"
            stroke="#007BFF"
            stroke-width="6"
            stroke-dasharray="10 10"
          />
        </svg>
      </div>

      <!-- SERVICE CARDS LOOP WITH INTER-CARD TEXT -->
      <div v-for="(section, i) in services" :key="section.id">
         <!-- BETWEEN CARDS TEXT -->
         <div
          v-if="section.description"
          class="between-text"
          :data-aos="'fade-in'"
          :data-aos-delay="i * 100 + 50"
        >
          {{ section.description }}
        </div>
        <article
          class="section-card"
          :class="i % 2 === 0 ? 'layout-left' : 'layout-right'"
          :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'"
          :data-aos-delay="i * 100"
        >

      

             <div class="icon-block">
    <div v-html="section.icon" class="service-icon"></div>
  </div>


  <div class="text-block">
    <h2 class="shine-title">{{ section.title }}</h2>
    <p class="highlight">{{ section.highlight }}</p>
    <button class="btn-main mt-3" @click="openModal(section)">
      Découvrir
    </button>
  </div>
       
<!-- 


          <div class="icon-block">
            <div v-html="section.icon" class="service-icon"></div>
            <h2 class="shine-title">{{ section.title }}</h2>
            <p class="highlight">{{ section.highlight }}</p>
            <p class="description">{{ section.description }}</p>
            <button class="btn-main mt-3" @click="openModal(section)">
              Découvrir
            </button>
          </div>
   -->
          
        </article>

       
      </div>

      <FooterForm class="footer-fix"/>
    </main>

    <!-- MODAL -->
    <Modal
      v-if="selectedService"
      :title="selectedService.title"
      :image="selectedService.image"
      :modalSections="selectedService.modalSections"
      @close="closeModal"
    />
  </div>
  
</template>



<style scoped>

.footer-fix {
  position: relative;
  z-index: 20; /* or 9999 */
}

.container {
  max-width: 1100px;
  margin: 2em auto;
  padding: 0 1em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

/* Alternating layout */
.section-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3em;
  background: white;
  border-radius: 12px;
  padding: 2em;
  margin-bottom: 4em;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  animation: glowPulse 8s infinite ease-in-out;
}
.layout-left .icon-block {
  order: 1;
}
.layout-left .text-block {
  order: 2;
}
.layout-right .icon-block {
  order: 2;
}
.layout-right .text-block {
  order: 1;
}

/* Text narrow column */
.icon-block {
  flex: 1;
  max-width: 450px;
}
.icon-block ul {
  list-style-type: disc;
  padding-left: 1.5em;
  color: #555;
}
.icon-block li {
  margin-bottom: 0.6em;
  line-height: 1.4;
}

/* Image out of frame effect */
.text-block {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  perspective: 1000px; /* gives the 3D depth */
}

.whyus-image {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.25);
  transform: translateY(-10px) translateX(20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 2;
}
.section-card:hover .whyus-image {
  transform: translateY(-15px) translateX(25px) scale(1.02) rotateY(3deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.whyus-image::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 8px;
  background: #ccc; /* fallback if no image color sampling */
  filter: brightness(85%);
  border-radius: 0 0 10px 10px;
  transform: rotateX(90deg);
  transform-origin: top;
  z-index: -1;
}

.whyus-image::before {
  content: "";
  position: absolute;
  top: 0;
  right: -8px;
  width: 8px;
  height: 100%;
  background: #bbb; /* fallback shade */
  filter: brightness(80%);
  border-radius: 0 10px 10px 0;
  transform: rotateY(90deg);
  transform-origin: left;
  z-index: -1;
}

/* Title with animated glowing underline */
.shine-title {
  position: relative;
  display: inline-block;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.75em;
  padding-bottom: 0.3em;
}

/* Static underline */
.shine-title::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: #007BFF;
  border-radius: 2px;
}

.shine-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -60%;
  width: 60%; /* was 50% */
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.9),
    transparent
  );
  border-radius: 2px;
  animation: underlineShine 2.5s infinite ease-in-out;
}

@keyframes underlineShine {
  0% { left: -60%; }
  50% { left: 100%; }
  100% { left: 100%; }
}




/* Card glow pulse */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
  50% { box-shadow: 0 8px 25px rgba(0,123,255,0.15); }
}

/* Parallax hero */
.parallax-hero {
  position: relative;
  height: 320px;
  background: url('/professional-hero.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
  margin-bottom: 3em;
}
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
}
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}
.hero-content h1 {
  font-size: 2.8rem;
  margin-bottom: 0.5em;
  font-weight: 700;
}
.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 1.5em;
  line-height: 1.4;
}
.btn-main {
  background-color: #007BFF;
  color: white;
  padding: 0.8em 1.8em;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.btn-main:hover {
  background-color: #0056b3;
}

.image-frame {
  position: relative;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  overflow: hidden;
  transform: translateY(-10px) translateX(20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 2;
  box-shadow: 0 15px 35px rgba(0,0,0,0.25);
}

/* hover tilt */
.section-card:hover .image-frame {
  transform: translateY(-15px) translateX(25px) scale(1.02) rotateY(3deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.image-frame::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 15px;
  background: linear-gradient(to bottom, #ccc, #999);
  border-radius: 0 0 10px 10px;
  transform: rotateX(90deg);
  transform-origin: top;
  z-index: -1;
}

.image-frame::before {
  content: "";
  position: absolute;
  top: 0;
  right: -15px;
  width: 15px;
  height: 100%;
  background: linear-gradient(to right, #bbb, #888);
  border-radius: 0 10px 10px 0;
  transform: rotateY(90deg);
  transform-origin: left;
  z-index: -1;
}

/* Extra soft shadow to sell the depth */
.image-frame {
  box-shadow: 0 20px 45px rgba(0,0,0,0.35);
}

.container {
  position: relative;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 6px;
  background-size: 100% 20px;
  transform: translateX(-10%);
  /*opacity: 0.15;*/
  pointer-events: none;
}

.layout-left {
  margin-left: -40px;
}
.layout-right {
  margin-right: -40px;
}

.container {
  max-width: 1250px; /* was 1100px */
  margin: 2em auto;
  padding: 0 2em; /* was 1em */
}

.section-card {
  gap: 2em; /* was 3em — tighter */
}

.icon-block {
  flex: 1;
  max-width: 500px; /* was 450px — give more space */
}
main.container {
  position: relative; /* container for absolute children */
  min-height: 3000px; /* or higher if needed, to match content */
  overflow: visible; /* prevent clipping */
}

.background-path {
  position: absolute;
  top: 0;
  left: 50%;
  width: 500px;
  height: 3000px; /* explicitly match or exceed main content height */
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 0;
}
.desktop-image {
  display: block;
}

.mobile-svg {
  width: 180px;
  height: 180px;
  color: #007BFF;      /* your blue */
  opacity: 0.15;       /* subtle */
  margin: 1.5em auto;
  display: block;
}

@media (max-width: 768px) {
  /* Remove zigzag margins */
  .layout-left,
  .layout-right {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  /* Tighten container edges */
  .container {
    padding-left: 0.25em !important;
    padding-right: 0.25em !important;
  }

  /* Service cards */
  .section-card {
    max-width: 95% !important; 
    padding: 0.8em !important;
    gap: 0.5em !important;
    box-shadow: none !important;
    border: 1px solid rgb(0, 123, 255) !important;
    border-radius: 8px !important;
    margin-bottom: 0.8em !important;
    display: flex !important;
    flex-direction: column !important;
    z-index: 2;  
  }

  /* Title above SVG */
  .section-card .icon-block {
    order: 1;
  }
  .section-card .text-block {
    order: 2;
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
    flex: 0 0 auto;
  }

  /* Font size tweaks */
  .section-card .shine-title {
    font-size: 1.1em !important;
    margin-bottom: 0.3em !important; /* tighter under title */
  }
  .section-card .icon-block li {
    font-size: 0.95em !important;
    line-height: 1.4em !important;
  }

  /* SVG size */
  .mobile-svg {
    display: block;
    width: 150px !important;
    height: 150px !important;
    margin: 0 auto !important;
  }

  /* No image shadow */
  .image-frame {
    transform: none !important;
    box-shadow: none !important;
  }

  /* Background path fits screen */
  .background-path {
    width: 100% !important;
    left: 0 !important;
     transform: none !important;
  }

  .parallax-hero {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 0.5em !important;
    overflow-x: hidden !important;
    transform: none !important; /* stop shifting image on mobile */
    background-attachment: scroll !important; /* disable parallax if using background */
    z-index:1;
    position: relative;
  }

    /* Hero text size tweaks */
    .parallax-hero h1 {
    font-size: 1.6rem !important; /* smaller heading */
    line-height: 1.2 !important;
  }

  .parallax-hero p {
    font-size: 0.95rem !important; /* smaller body text */
    line-height: 1.4 !important;
    margin-top: 0.5em !important;
    margin-bottom: 1em !important;
  }

  /* Button spacing tweak */
  .parallax-hero .btn-main {
    padding: 0.5em 1em !important;
    font-size: 0.9rem !important;
  }

/* 1) Remove title underline/shine on mobile to avoid duplicate line */
.section-card .shine-title::before,
.section-card .shine-title::after {
  display: none !important;
}

/* 2) Shining line under the SVG (mobile only) */
.mobile-svg {
  position: relative; /* anchor for the pseudo element */
  display: block;
}
.mobile-svg::after {
  content: "";
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: -6px;               /* sits just under the icon box */
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgba(137, 181, 228, 0.71) 0%,
    rgba(0,123,255,0.9) 50%,
    rgba(110, 138, 167, 0.806) 100%
  );
  background-size: 200% 100%;
  animation: mobileShine 2.2s linear infinite;
  pointer-events: none;
}
@keyframes mobileShine {
  0%   { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

/* 3) (Optional) subtle sweep along the SVG stroke itself.
   Because styles are scoped, use :deep(...) to reach into v-html SVG. */
:deep(.mobile-svg svg *) {
  stroke: #007BFF; /* keep your blue */
}

.mobile-svg svg {
  display: block;
  width: 64px;
  height: 64px;
  stroke: #333; /* keep your preferred stroke color */
  transition: filter 0.2s;
}

.pulse-stroke svg {
  animation: pulse-bright 2s infinite;
}

@keyframes pulse-bright {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(2);
  }
}

.pulse-stroke {
  animation: pulse 2s infinite ease-in-out;
  stroke-width: 3;
  stroke: currentColor;
  fill: none;
}

@keyframes pulse {
  0% {
    opacity: 0.2;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.2;
    transform: scale(0.95);
  }
}
:deep(.mobile-svg svg path),
:deep(.mobile-svg svg circle),
:deep(.mobile-svg svg line),
:deep(.mobile-svg svg polyline),
:deep(.mobile-svg svg polygon) {
  stroke-dasharray: 80 140;       /* long dash + long gap = smooth sweep */
  stroke-dashoffset: 0;
  stroke: #479df9;
   animation: strokeSweep 6s ease-in-out infinite;
}
@keyframes strokeSweep {
  0%   { stroke-dashoffset: -140; opacity: 1; }
  50%  { stroke-dashoffset:   0; opacity: 2; }
  80% { stroke-dashoffset: 0; opacity: 1; }


}
.section-card {
  background-color: #d5e6ff; 
  }

}



.fullpage  {
  background-color: #4c94ff; 
  z-index: 5; 
  position: relative;
}

.icon-wrapper {
  position: relative;
  display: block; /* section is block anyway */
  overflow: hidden; /* hides gradient outside bounds */
}

.icon-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.05) 20%,
    rgba(255,255,255,0.6) 50%,
    rgba(255,255,255,0.05) 80%,
    rgba(255,255,255,0) 100%
  );
  transform: skewX(-20deg);
  pointer-events: none;
  animation: shine-once 3s linear ; /* run once */
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

}

@keyframes shine-once {
  0%   { left: -100%; }   /* start fully offscreen */
  50%  { left: 100%; }    /* move fully across */
  100% { left: -100%; }   /* reset offscreen */
}

.parallax-hero {
  position: relative; /* or absolute/fixed if needed */
  z-index: 1;        /* higher than the background div */
  background: rgba(255, 255, 255, 0.8);
}

.between-text {
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  background: #f0f7ff;
  border-left: 4px solid #007BFF;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  opacity: 0.9;
  animation: slideFade 0.8s ease-in-out forwards;
}

@keyframes slideFade {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* --- Compact service card --- */
.section-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  min-height: 80px;           /* much shorter */
  max-height: 120px;          /* optional, caps height */
  width: 100%;
  gap: 1.5rem;                /* spacing between icon and text */
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Alternate layout: icon on right */
.layout-right .icon-block {
  order: 2;
}
.layout-right .text-block {
  order: 1;
}

/* Icon / logo block */
.text-block {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;              /* consistent size for icon */
  height: 60px;
}

/* Optional image frame styling if using real images */
.image-frame {
  width: 60px;
  height: 60px;
  border-radius: 50%;       /* round icon or logo */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Text block */
.icon-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

/* Title & text */
.shine-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}
.highlight {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}
.description {
  font-size: 0.85rem;
  opacity: 0.7;
  margin: 0;
}

/* Button */
.btn-main {
  align-self: flex-start;
  margin-top: 0.25rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
}

/* Hover effect */
.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .section-card {
    flex-direction: column;
    min-height: auto;
    max-height: none;
    gap: 0.75rem;
    padding: 0.8rem 1rem;
  }

  .layout-right .icon-block,
  .layout-right .text-block {
    order: unset;
  }

  .text-block,
  .image-frame {
    width: 50px;
    height: 50px;
  }

  .shine-title {
    font-size: 1rem;
  }
  .highlight, .description {
    font-size: 0.85rem;
  }
}


</style>
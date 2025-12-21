<script setup lang="ts">
import { ref, onMounted} from 'vue'
//import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Modal from "./Modal.vue"
import { services, type ServiceItem } from "../data/services"
import FooterForm from '@/components/FooterForm.vue'

const selectedService = ref<ServiceItem | null>(null)
const openModal = (service: ServiceItem | null) => (selectedService.value = service)
const closeModal = () => (selectedService.value = null)

onMounted(() => {
  AOS.init({ duration: 800, once: true })
 /* new Rellax('.rellax')

  const oldColor = document.body.style.backgroundColor
  document.body.style.backgroundColor = '#0042a5'
  onUnmounted(() => {
    document.body.style.backgroundColor = oldColor
  })*/
})
</script>

<template>
  <div class="fullpage">
    <section class="parallax-hero rellax" data-rellax-speed="-3">
  <div class="hero-side-bg"></div>
  <div class="overlay"></div>

  <div class="container text-center hero-content">
    <h1>Services pour les Professionnels</h1>
    <p>Solutions fiables, adaptées et sécurisées pour TPE, PME, indépendants et professions libérales.</p>
  </div>
</section>

    <main class="container" id="services">
      <div class="background-path">
        <svg viewBox="0 0 500 2500" preserveAspectRatio="none">
          <path
            d="M250,0 C450,200 50,400 450,600 C50,800 450,1000 50,1200 C450,1400 100,1600 400,1800 C100,2000 450,2200 150,2400"
            fill="none"
            stroke="#007BFF"
            stroke-width="6"
            stroke-dasharray="10 10"
          />
        </svg>
      </div>

      <div v-for="(section, i) in services" :key="section.id">
        <div v-if="section.description" class="between-text" :data-aos="'fade-in'" :data-aos-delay="i * 100 + 50">
          {{ section.description }}
        </div>
        <article class="section-card" :class="i % 2 === 0 ? 'layout-left' : 'layout-right'" :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'" :data-aos-delay="i * 100">
          <div class="icon-block" v-html="section.icon"></div>
          <div class="text-block">
            <h2 class="shine-title">{{ section.title }}</h2>
            <p class="highlight">{{ section.highlight }}</p>
            <button class="btn-main mt-2" @click="openModal(section)">Découvrir</button>
          </div>
        </article>
        
      </div>

      <FooterForm />
    </main>

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
/* Full-page background */
.fullpage {
 
  position: relative;
  overflow-x: hidden;
}

/* Hero section */
.parallax-hero {
  position: relative;
  height: 320px;
 /* background: url('/professional-hero.jpg') center/cover no-repeat;*/
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: 3em;
  overflow: hidden;
}
.parallax-hero .overlay {
  position: absolute;
  inset: 0;
  background: transparent;
}
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}
.hero-content h1 { font-size: 2.8rem; font-weight: 700; margin-bottom: 0.5em; color:#063e91 }
.hero-content p { font-size: 1.2rem; line-height: 1.4; color:#063e91}

/* Container */
.container {
  max-width: 1100px;
  margin: 2em auto;

  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 
  background: rgba(255,255,255,0.05); 
 backdrop-filter: blur(2px);
  border-radius: 12px;
  padding: 2em 1em;
}

/* Background path */
.background-path {
  position: absolute;
  top: 0;
  left: 50%;
  width: 500px;
  height: 100%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 0;
}

/* Service cards */
.section-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
    background-color: #f9fbff;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 3em;
  border: 1px solid rgba(0, 66, 165, 0.05); 
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,123,255,0.15);
}
.layout-left .icon-block { order: 1; }
.layout-left .text-block { order: 2; }
.layout-right .icon-block { order: 2; }
.layout-right .text-block { order: 1; }

/* Icon & text blocks */
.icon-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.text-block {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.shine-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}
.highlight {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

.between-text {
  position: relative;
  margin: 2rem 0;
  padding: 1rem 1.5rem 1rem 2rem;
  background: #f0f7ff;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  overflow: hidden;
}

/* Static left line */
.between-text::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: #007BFF;
  border-radius: 2px;
}

/* Shining vertical sweep */
.between-text::after {
  content: "";
  position: absolute;
  left: 0;
  top: -60%;
  width: 4px;
  height: 60%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(255, 255, 255, 0.9),
    transparent
  );
  border-radius: 2px;
  animation: verticalShine 2.5s infinite ease-in-out;
}

@keyframes verticalShine {
  0%   { top: -60%; }
  50%  { top: 100%; }
  100% { top: 100%; }
}

.btn-main {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin: 0.75rem auto 0; /* ← centers horizontally */
  padding: 0.45rem 1.1rem;
  font-size: 1.25rem;
  font-weight: 600;

  background: rgba(0, 123, 255, 0.14);
  color: #004fc6;

  border: 1px solid rgba(0, 123, 255, 0.3);
  border-radius: 999px;

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

.btn-main:hover {
  background: #4aca30;;
  box-shadow: 0 5px 14px#98ff83;
  transform: translateY(-1px);
}/*
.btn-main:hover {
  background: rgba(0, 123, 255, 0.22);
  box-shadow: 0 5px 14px rgba(0, 123, 255, 0.22);
  transform: translateY(-1px);
}*/

.btn-main:active {
  transform: translateY(0);
}



/* Footer fix */
footer, .footer-fix {
  position: relative;
  z-index: 2;
}

/* Responsive */
@media (max-width: 768px) {
  .section-card {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.8rem 1rem;
  }
  .layout-left .icon-block,
  .layout-right .icon-block {
    order: unset;
  }
  .shine-title { font-size: 1rem; }
  .highlight { font-size: 0.85rem; }
  .background-path { width: 100%; left: 0; transform: none; }
  .parallax-hero { height: auto; padding: 1rem 0; }
}

.icon-block {
  flex: 0 0 auto;
  width: 160px;     /* desired icon width */
  height: 160px;    /* desired icon height */
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-block svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5; /* thin lines */
  max-width: 100%;
  max-height: 100%;
}


.parallax-hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* Side background image */
.hero-side-bg {
  position: absolute;
  inset: 0;
  background: url('/wix_bg.avif') center / cover no-repeat;
 /*opacity: 0.25;  subtle, decorative */
  z-index: 0;
}

/* Keep text above */
.parallax-hero .overlay,
.parallax-hero .hero-content {
  position: relative;
  z-index: 1;
}






.section-card {
  background: linear-gradient(135deg, rgba(249, 251, 255, 0.95), rgba(245, 249, 255, 0.85));
  border: 1px solid rgba(0, 66, 165, 0.08); 
  box-shadow: 0 8px 20px rgba(0, 66, 165, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
}
.section-card {
  border-radius: 16px 16px 8px 16px; /* subtle asymmetric corners */
  padding: 1.8rem 1.5rem;
}
.icon-block {
  background: rgba(0, 123, 255, 0.06);
  border-radius: 50%;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  background: linear-gradient(135deg, rgba(249,251,255,0.95), rgba(245,249,255,0.85));
  border-radius: 16px 16px 8px 16px;
  border: 1px solid rgba(0,66,165,0.08);
  box-shadow: 0 8px 20px rgba(0,66,165,0.08);
  padding: 1.8rem 1.5rem;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
}

.section-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0,123,255,0.12);
  background: linear-gradient(135deg, rgba(249,251,255,1), rgba(245,249,255,0.92));
}

.icon-block {
  flex: 0 0 auto;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,123,255,0.06);
  border-radius: 50%;
}


.shine-title {
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.4rem;       /* slightly bigger, confident */
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.4rem;

  color: #003f9c;          /* deep blue, professional */
  letter-spacing: 0.5px;   /* subtle spacing, more premium */
  text-transform: capitalize;
  position: relative;
}
@media (max-width: 768px) {
  .hero-content {
    max-width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .hero-content h1 {
    font-size: 1.6rem;
    line-height: 1.25;
    word-break: break-word;
    hyphens: auto;
  }

  .hero-content p {
    font-size: 0.95rem;
    line-height: 1.35;
  }
}

</style>

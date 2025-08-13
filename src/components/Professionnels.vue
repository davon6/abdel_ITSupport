<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ContactForm from './ContactForm.vue'

const isMobile = ref(false)
const pathHeight = ref('2500px')

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  // Init animations
  AOS.init({ duration: 800, once: true })
  new Rellax('.rellax')

  // Path height calc
  const container = document.querySelector('main.container')
  if (container) {
    pathHeight.value = container.scrollHeight + 'px'
  }

  // Mobile detection
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>

<template>
 
 

  <section class="parallax-hero rellax" data-rellax-speed="-3">
    <div class="overlay"></div>
    <div class="container text-center hero-content">
      <h1>Services pour les Professionnels</h1>
      <p>Solutions fiables, adaptées et sécurisées pour TPE, PME, indépendants et professions libérales.</p>
      <router-link to="#services" class="btn-main">Découvrir nos services</router-link>
    </div>
  </section>





  <main class="container" id="services">

    <div class="background-path" :style="{ height: pathHeight }">
  <svg viewBox="0 0 500 2500" preserveAspectRatio="none">
    <path d="
  M250,0 
  C450,200 50,400 450,600
  C50,800 450,1000 50,1200
  C450,1400 100,1600 400,1800
  C100,2000 450,2200 150,2400
" 
fill="none" stroke="#007BFF" stroke-width="6" stroke-opacity="0.15" stroke-dasharray="10 10"/>
</svg>
</div>



    <article
  v-for="(section, i) in sections"
  :key="i"
  class="section-card"
  :class="i % 2 === 0 ? 'layout-left' : 'layout-right'"
  :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'"
  :data-aos-delay="i * 100"
>
  <div class="text-block">
    <h2 class="shine-title">{{ section.title }}</h2>
    <ul>
      <li v-for="(item, idx) in section.items" :key="idx">{{ item }}</li>
    </ul>
  </div>

  <div class="image-block">
  <div class="image-frame">
    <img
      v-if="!isMobile"
      src="/istockphoto.jpg"
      alt="Business IT Solutions"
    />
    <div v-else v-html="section.svgIcon" class="mobile-svg"></div>
  </div>
</div>

</article>

    <ContactForm />

  </main>

</template>

<script lang="ts">


const supportIcon  =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M14 42l10-10 12 12-10 10a6 6 0 01-8.49 0 6 6 0 010-8.49z"/>
  <path d="M45 19l-6-6a4 4 0 00-5.66 0l-4 4"/>
</svg> `


const securityIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 2 L12 12v20c0 13 20 28 20 28s20-15 20-28V12L32 2z"/>
  <path d="M32 22v18" />
</svg>`

const installationIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="32" cy="32" r="10" />
  <path d="M32 2v8M32 54v8M2 32h8M54 32h8M12 12l5.5 5.5M46.5 46.5l5.5 5.5M12 52l5.5-5.5M46.5 17.5l5.5-5.5"/>
</svg>`

const servicesIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="32" cy="32" r="30"/>
  <path d="M2 32h60M32 2a58 58 0 010 60"/>
  <path d="M12 12c8 8 8 32 0 40M52 12c-8 8-8 32 0 40"/>
</svg> `

const reseauIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="12" cy="32" r="6"/>
  <circle cx="32" cy="32" r="6"/>
  <circle cx="52" cy="32" r="6"/>
  <path d="M18 32h8M38 32h8"/>
</svg>`


export default {
  data() {
    return {
      sections: [
        {
          title: 'Support & Maintenance',
          items: [
            'Contrats mensuels ou à la demande',
            'Téléassistance rapide (TeamViewer, AnyDesk…)',
            'Réparation express & diagnostic matériel/logiciel',
            'Mise en réseau sécurisée (LAN, Wi-Fi pro)'
          ],
          svgIcon: supportIcon
        },
        {
          title: 'Sécurité Informatique',
          items: [
            'Antivirus professionnels & pare-feu',
            'Maintenance préventive & sauvegardes automatiques',
            'Sensibilisation aux risques cyber'
          ],
          svgIcon: securityIcon
        },
        {
          title: 'Installation & Déploiement',
          items: [
            'Configuration de parc informatique complet',
            'Installation d’outils collaboratifs (Google Workspace, Office 365)',
            'Mise en place de serveurs NAS'
          ],
          svgIcon: installationIcon
        },
        {
          title: 'Services Web & Support Logiciel',
          items: [
            'Création de sites vitrines simples (WordPress, Wix)',
            'Conseils hébergement, nom de domaine & référencement local',
            'Aide à l’utilisation et migration de logiciels métier'
          ],
          svgIcon: servicesIcon
        },
        {
          title: 'Installation Réseau & Baies',
          items: [
            'Installation de baies de brassage professionnelles',
            'Câblage réseau structuré (RJ45, fibre optique)',
            'Configuration switchs & routeurs pro',
            'Optimisation du réseau pour performances & sécurité'
          ],
          svgIcon: reseauIcon
        }
      ]
    }
  }
}
</script>

<style scoped>
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
.layout-left .text-block {
  order: 1;
}
.layout-left .image-block {
  order: 2;
}
.layout-right .text-block {
  order: 2;
}
.layout-right .image-block {
  order: 1;
}

/* Text narrow column */
.text-block {
  flex: 1;
  max-width: 450px;
}
.text-block ul {
  list-style-type: disc;
  padding-left: 1.5em;
  color: #555;
}
.text-block li {
  margin-bottom: 0.6em;
  line-height: 1.4;
}

/* Image out of frame effect */
.image-block {
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
  opacity: 0.15;
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

.text-block {
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
  .image-frame {
    max-width: 100% !important;  /* allow full width */
    transform: none !important;  /* remove translate and rotate */
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  .image-frame img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  main.container {
    padding-right: 1.5em !important;
    padding-left: 1.5em !important; /* balance left side too */
  }

  /* Or if it’s specifically the right content inside the sections */
  .layout-right .image-block,
  .layout-right .text-block {
    padding-right: 1.5em;
  }



/* Ensure parallax hero doesn't overflow */
.parallax-hero {
  width: 100% !important;
  max-width: 100% !important;
  padding-left: 1.5em !important;
  padding-right: 1.5em !important;
  box-sizing: border-box !important;
  overflow-x: hidden !important;
}

  .hero-content h1 {
    font-size: 1.8rem;
    line-height: 1.2;
  }

  .hero-content p {
    font-size: 1rem;
    margin-bottom: 1.5em;
  }

  .btn-main {
    padding: 0.8em 2em;
    font-size: 1rem;
  }
  .container {
    width: 100% !important;
    max-width: 100% !important;
    padding-left: 0.1em !important;  /* minimal side padding */
    padding-right: 0.1em !important;
    margin-left: auto !important;
    margin-right: auto !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }


  /* Section card clamp and reset margin/padding */
  .section-card {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 auto !important;
    padding-left: 1em !important;
    padding-right: 1em !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    padding: 1.2em 1em !important;
    gap: 1.2em !important;
  }
 /* debug: shows card boundary */
  
  .desktop-image {
    display: none;
  }
  .mobile-svg {
    display: block;
  }

  .layout-left,
  .layout-right {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .background-path {
    width: 100% !important; /* prevent SVG from sticking out */
    left: 0 !important;
    transform: none !important;
  }
}

</style>

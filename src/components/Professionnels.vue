<script setup lang="ts">
import { onMounted } from 'vue'
import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ContactForm from './ContactForm.vue'
 
onMounted(() => {
 AOS.init({ duration: 800, once: true })
  new Rellax('.rellax')
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
      <img src="/istockphoto.jpg" alt="Business IT Solutions" />
    </div>
  </div>
</article>




    <ContactForm />

  </main>

</template>

<script lang="ts">
import {  ref } from 'vue'

const pathHeight = ref('2500px')

onMounted(() => {
  const updateHeight = () => {
    const container = document.querySelector('main.container')
    if (container) {
      pathHeight.value = (container as HTMLElement).offsetHeight + 'px'
    }
  }
  updateHeight()
  window.addEventListener('resize', updateHeight)
})



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
          ]
        },
        {
          title: 'Sécurité Informatique',
          items: [
            'Antivirus professionnels & pare-feu',
            'Maintenance préventive & sauvegardes automatiques',
            'Sensibilisation aux risques cyber'
          ]
        },
        {
          title: 'Installation & Déploiement',
          items: [
            'Configuration de parc informatique complet',
            'Installation d’outils collaboratifs (Google Workspace, Office 365)',
            'Mise en place de serveurs NAS'
          ]
        },
        {
          title: 'Services Web & Support Logiciel',
          items: [
            'Création de sites vitrines simples (WordPress, Wix)',
            'Conseils hébergement, nom de domaine & référencement local',
            'Aide à l’utilisation et migration de logiciels métier'
          ]
        },
        {
          title: 'Installation Réseau & Baies',
          items: [
            'Installation de baies de brassage professionnelles',
            'Câblage réseau structuré (RJ45, fibre optique)',
            'Configuration switchs & routeurs pro',
            'Optimisation du réseau pour performances & sécurité'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

/* === Desktop and default styles === */

.container {
  max-width: 1100px;
  margin: 2em auto;
  padding: 0 1em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  position: relative;
}

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

.image-block {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  perspective: 1000px;
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

.shine-title {
  position: relative;
  display: inline-block;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.75em;
  padding-bottom: 0.3em;
}

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
  width: 60%; 
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

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
  50% { box-shadow: 0 8px 25px rgba(0,123,255,0.15); }
}

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

/* === Mobile Styles === */
@media (max-width: 768px) {
  main.container {
    padding-left: 1.5em !important;
    padding-right: 1.5em !important;
  }

  .section-card {
    flex-direction: column;
    overflow: visible;
    gap: 1.5em;
    padding: 1.5em;
    margin-bottom: 3em;
  }

  .layout-left,
  .layout-right {
    margin: 0;
  }

  .text-block,
  .image-block {
    max-width: 100%;
    flex: none;
  }

  /* Restore image-frame shadows but remove transforms for clarity on mobile */
  .image-frame {
    max-width: 100% !important;
    width: 100%;
    transform: none !important;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    border-radius: 10px;
    overflow: hidden;
  }

  .image-frame img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    display: block;
  }

  /* Adjust parallax hero */
  .parallax-hero {
    height: auto;
    min-height: 280px;
    padding: 3em 1.5em;
    background-position: center center;
    background-size: cover;
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
}




</style>

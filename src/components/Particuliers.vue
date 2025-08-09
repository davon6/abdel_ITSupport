<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'

const route = useRoute()
const opacity = ref(1) // Define opacity as a reactive property

function disableAOSScroll() {
  // Remove scroll event listeners that AOS attached
  window.removeEventListener('scroll', AOS.refresh)
  window.removeEventListener('resize', AOS.refresh)
  window.removeEventListener('load', AOS.refresh)

  // Add 'aos-animate' class to all AOS elements to keep them animated
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.classList.add('aos-animate')
  })
}

onMounted(() => {
  new Rellax('.rellax')

  AOS.init({
    duration: 800,
    once: true,
    disableMutationObserver: true,  // optional: less overhead
  })

  if (route.hash) {
    nextTick(() => {
      const target = document.querySelector(route.hash)
      if (target) {
        // Jump instantly to the section
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'auto'
        })

        // Wait a moment and then disable further AOS animations on scroll
        setTimeout(() => {
          disableAOSScroll()
        }, 200) // 200ms delay to let initial animation finish
      }
    })
  }
})

</script>


<template>

  <div :style="{ opacity: opacity }" id="page-content">
    <!-- Hero Banner -->
    <section class="parallax-hero rellax" data-rellax-speed="-3"  >
      <div class="overlay"></div>
      <div class="container text-center">
        <h1>Services Informatiques pour Particuliers</h1>
        <p>Assistance, dépannage et conseils à domicile ou à distance</p>
      </div>
    </section>
  
    <main>
  
      <!-- Dépannage informatique -->
      <section class="section-light" id="depannage">
        <div class="container">
          <h2 class="section-title" data-aos="fade-up">🔧 Dépannage informatique</h2>
          <ul class="service-list" data-aos="fade-up" data-aos-delay="100">
            <li>Réparation de PC / Mac (système lent, bugs, écran bleu, etc.)</li>
            <li>Suppression de virus, malware, publicités</li>
            <li>Nettoyage et optimisation des performances de votre ordinateur</li>
            <li>Réinstallation complète ou mise à jour de Windows / macOS / Linux</li>
          </ul>
        </div>
      </section>
  
      <!-- Installation et configuration -->
      <section class="section-dark">
        <div class="container">
          <h2 class="section-title text-white" data-aos="fade-up">📦 Installation & Configuration</h2>
          <ul class="service-list" data-aos="fade-up" data-aos-delay="100">
            <li>Installation et configuration : imprimante, périphériques, réseaux, Wi-Fi, box</li>
            <li>Mise en place du Wi-Fi à domicile</li>
            <li>Configuration de comptes : emails, cloud, antivirus</li>
            <li>Installation de logiciels bureautique, messagerie et applications courantes</li>
          </ul>
        </div>
      </section>
  
      <!-- Sauvegarde & données -->
      <section class="section-light">
        <div class="container">
          <h2 class="section-title" data-aos="fade-up">☁️ Sauvegarde & Données</h2>
          <ul class="service-list" data-aos="fade-up" data-aos-delay="100">
            <li>Sauvegarde automatique sur disque dur externe ou cloud</li>
            <li>Récupération de données perdues (photos, documents...) sur clé USB, disque ou smartphone</li>
            <li>Clonage de disque dur ou transfert vers SSD</li>
            <li>Sécurisation de la navigation : antivirus, pare-feu, contrôle parental</li>
          </ul>
        </div>
      </section>
  
      <!-- Assistance mobile -->
      <section class="section-dark">
        <div class="container">
          <h2 class="section-title text-white" data-aos="fade-up">📱 Assistance Mobile</h2>
          <ul class="service-list" data-aos="fade-up" data-aos-delay="100">
            <li>Aide à l'utilisation de smartphones et tablettes</li>
            <li>Connexion téléphone ⇄ PC (sauvegarde, synchronisation)</li>
            <li>Installation d'applications utiles et contrôle parental</li>
          </ul>
        </div>
      </section>
  
      <!-- Formation à domicile -->
      <section class="section-light section-dark"  id="formation">
        <div class="container">
          <h2 class="section-title" data-aos="fade-up">🧓 Formation à domicile</h2>
          <ul class="service-list" data-aos="fade-up" data-aos-delay="100">
            <li>Initiation à l'informatique : PC, emails, navigation Internet, Word</li>
            <li>Séances personnalisées pour seniors et débutants</li>
            <li>Sensibilisation sécurité numérique : éviter les arnaques et virus</li>
          </ul>
        </div>
      </section>
  
    </main>
  
    <footer>
      <p>© 2025 ShoTech. Assistance informatique particuliers.</p>
    </footer>
  </div>
  </template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background: #f4f4f9;
}

/* Navigation */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0077cc;
  padding: 15px 30px;
  color: white;
}

nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

/* Hero Banner */
.parallax-hero {
  position: relative;
  background-image: url('/digitization.jpg');
  background-size: cover;
  background-position: center;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.parallax-hero .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.4);
  z-index: 1;
}

.parallax-hero .container {
  position: relative;
  z-index: 2;
  color: white;
}

/* Section Styling */
.section-light {
  padding: 60px 20px;
  background: #fff;
}

.section-dark {
  padding: 60px 20px;
  background: #3a3a3a;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Titles */
.section-title {
  font-size: 2rem;
  margin-bottom: 30px;
}

/* Service List */
.service-list {
  list-style: none;
  line-height: 2;
  font-size: 1.1rem;
  padding-left: 0;
}

.service-list li {
  padding: 10px 0;
  border-bottom: 1px solid rgba(200, 200, 200, 0.2);
}

/* Footer */
footer {
  text-align: center;
  padding: 20px;
  background: #0077cc;
  color: white;
  margin-top: 60px;
}

.page-enter {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
}

</style>

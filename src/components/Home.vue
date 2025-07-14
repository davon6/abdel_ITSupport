<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ChoiceModal from '@/components/ChoiceModal.vue'
import { useRouter, useRoute } from 'vue-router'

const showModal = ref(false)
const router = useRouter()
const route = useRoute()

function onDiscoverClick() {
  showModal.value = true
}

function handleClose() {
  showModal.value = false
}

function handleNavigate(url: string) {
  if (url.includes('#')) {
    const [path, hash] = url.split('#')
    if (route.path === path) {
      // Force re-trigger hash navigation on the same path
      router.replace({ hash: '' }).then(() => {
        router.push({ hash: `#${hash}` })
      })
    } else {
      router.push(url)
    }
  } else {
    router.push(url)
  }
  showModal.value = false
}

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  })

  new Rellax('.rellax')
})


</script>



<template>
  <header>
    <nav>
     
      <ul class="nav-links">
        <li> <router-link to="/particuliers">Particuliers</router-link></li>
        <li> <router-link to="/professionnels">Professionnels</router-link></li>
        <li><a href="#Apropos">A propos</a></li>
      </ul>
    </nav>
  </header>

  <main>

    <!-- Hero Parallax Section -->
    <section class="parallax-hero rellax" data-rellax-speed="-3">
      <div class="overlay"></div>
      <div class="container text-center">
        <h1>ShoTech — Solutions Informatiques & Conseil IT</h1>
        <p>Experts en gestion, sécurité et performance informatique pour particuliers et entreprises.</p>
         <button @click="onDiscoverClick" class="btn-main">Découvrir Nos Services</button>
  <ChoiceModal :visible="showModal" @close="handleClose" @navigate="handleNavigate" />

      </div>
    </section>

    <!-- Presentation Section -->
    <section class="section-light">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Votre partenaire IT de confiance</h2>
        <p class="lead" data-aos="fade-up" data-aos-delay="100">
          ShoTech accompagne les particuliers, indépendants, TPE/PME et associations dans la gestion, la sécurisation et l'optimisation de leur environnement informatique.
        </p>
        <a href="#contact" class="btn-secondary" data-aos="fade-up" data-aos-delay="200">Contactez-nous</a>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section-dark">
      <div class="container">
        <h2 class="section-title text-white" data-aos="fade-right">Nos services</h2>
        <div class="services-grid">

          <div class="service-card" data-aos="zoom-in">
            <h3>Maintenance & Dépannage</h3>
            <p>Assistance PC/Mac, configuration, dépannage, virus, données.</p>
          </div>

          <div class="service-card" data-aos="zoom-in" data-aos-delay="100">
            <h3>Infogérance & Parc IT</h3>
            <p>Gestion complète de votre infrastructure et sécurité renforcée.</p>
          </div>

          <div class="service-card" data-aos="zoom-in" data-aos-delay="200">
            <h3>Cybersécurité</h3>
            <p>Audit, antivirus pro, VPN, PRA/PCA et sensibilisation.</p>
          </div>

          <div class="service-card" data-aos="zoom-in" data-aos-delay="300">
            <h3>Téléphonie VoIP</h3>
            <p>Standard téléphonique physique et virtuel, softphones et maintenance.</p>
          </div>

          <div class="service-card" data-aos="zoom-in" data-aos-delay="400">
            <h3>Admin Systèmes & Réseaux</h3>
            <p>Serveurs, réseaux LAN/WAN, VPN, virtualisation et supervision.</p>
          </div>

          <div class="service-card" data-aos="zoom-in" data-aos-delay="500">
            <h3>Solutions Cloud</h3>
            <p>Microsoft 365, Google Workspace, hébergement cloud et télétravail sécurisé.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Parallax Image Section -->
    <section class="parallax-image rellax" data-rellax-speed="-2">
      <img src="/istockphoto.jpg" alt="IT Infrastructure">
      <div class="overlay"></div>
      <div class="container text-center">
        <h2 class="text-white" data-aos="fade-up">Votre IT, notre métier</h2>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="whyus" class="section-dark">
      <div class="container text-center">
        <h2 class="section-title text-white" data-aos="fade-up">Pourquoi choisir ShoTech ?</h2>
        <div class="advantages-grid">

          <div class="advantage" data-aos="fade-up">
            <h3>10+ ans</h3>
            <p>d’expertise IT certifiée</p>
          </div>

          <div class="advantage" data-aos="fade-up" data-aos-delay="100">
            <h3>100%</h3>
            <p>de satisfaction client</p>
          </div>

          <div class="advantage" data-aos="fade-up" data-aos-delay="200">
            <h3>24/7</h3>
            <p>Support réactif</p>
          </div>

          <div class="advantage" data-aos="fade-up" data-aos-delay="300">
            <h3>∞</h3>
            <p>Solutions sur-mesure</p>
          </div>

        </div>
        <a href="#contact" class="btn-main" data-aos="zoom-in">Demander un devis</a>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section-light">
      <div class="container text-center" data-aos="fade-up">
        <h2>Prêt à booster votre infrastructure informatique ?</h2>
        <p>Contactez-nous dès aujourd’hui pour un diagnostic gratuit et personnalisé.</p>
        <a href="tel:0123456789" class="btn-main">📞 01 23 45 67 89</a>
        <a href="mailto:contact@techsupportpro.fr" class="btn-secondary">✉️ contact@techsupportpro.fr</a>
      </div>
    </section>

  </main>

  <footer>
    <p>© 2025 IT Support Hub. All rights reserved.</p>
  </footer>
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

nav .logo {
  font-size: 1.5rem;
  font-weight: bold;
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

/* Hero Section */
.parallax-hero {
  position: relative;
  background-image: url('/digitization.jpg');
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.parallax-hero .overlay,
.parallax-image .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.4);
  z-index: 1;
}

.parallax-hero .container,
.parallax-image .container {
  position: relative;
  z-index: 2;
  color: white;
}

/* Sections */
.section-light {
  padding: 60px 20px;
  background: #fff;
}

.section-dark {
  padding: 60px 20px;
  background: #333;
  color: white;
}

/* Grids */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 2rem;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 2rem;
}

.service-card,
.advantage {
  padding: 20px;
  background: #444;
  color: white;
  border-radius: 8px;
}

.service-card {
  background: #555;
}

/* Parallax Image */
.parallax-image {
  position: relative;
  height: 60vh;
  overflow: hidden;
}

.parallax-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Buttons */
.btn-main {
  background: #ff6600;
  padding: 12px 30px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background: #0077cc;
  padding: 12px 30px;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
}

footer {
  text-align: center;
  padding: 20px;
  background: #0077cc;
  color: white;
}

html {
  scroll-behavior: smooth;
}
</style>

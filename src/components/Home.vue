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

const props = defineProps<{
  openSupportModal: () => void
}>()

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

    <div class="wave-divider">
  <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z" fill="#f4f4f9"></path>
  </svg>
</div>

<!-- Presentation Section -->
<section class="section-light rellax presentation-wrapper" data-rellax-speed="0.5">
  <div class="overlay"></div>
  <div class="container">
    <h2 class="section-title" data-aos="fade-up">Votre partenaire IT de confiance</h2>
    <p class="lead" data-aos="fade-up" data-aos-delay="100">
      ShoTech accompagne les particuliers, indépendants, TPE/PME et associations dans la gestion, la sécurisation et l'optimisation de leur environnement informatique.
    </p>
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

    <!-- Contact Section -->
<section id="contact" class="section-light contact-wrapper rellax" data-rellax-speed="0.5">
  <div class="overlay"></div>
  <div class="container text-center" data-aos="fade-up">
    <h2>Prêt à booster votre infrastructure informatique ?</h2>
    <p>Contactez-nous dès aujourd’hui pour un diagnostic gratuit et personnalisé.</p>

    <div class="cta-badge" @click="props.openSupportModal">
  🚀 Demander un diagnostic
</div>

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

.presentation-wrapper {
  padding: 120px 20px;
  background: linear-gradient(135deg, #f4f4f9 0%, #ffffff 100%);
  position: relative;
  z-index: 2;
}

.section-title {
  margin-bottom: 30px;
}

.lead {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-divider {
  height: 60px;
  background: url('/divider-wave.svg') no-repeat center;
  background-size: cover;
}

.presentation-wrapper {
  position: relative;
  padding: 120px 20px;
  background: url('/presentation-bg.jpg') center/cover no-repeat;
  background-attachment: fixed;
  z-index: 2;
  overflow: hidden;
}

.presentation-wrapper .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(244, 244, 249, 0.85);
  z-index: 1;
}

.presentation-wrapper .container {
  position: relative;
  z-index: 2;
}

.section-title {
  margin-bottom: 30px;
}

.lead {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}


.wave-divider {
  overflow: hidden;
  line-height: 0;
}

.wave-divider svg {
  display: block;
  width: 100%;
  height: 80px;
}
.contact-wrapper {
  position: relative;
  padding: 120px 20px;
  background: url('/contact-bg.jpg') center/cover no-repeat;
  background-attachment: fixed;
  z-index: 2;
  overflow: hidden;
}

.contact-wrapper .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(244, 244, 249, 0.9);
  z-index: 1;
}

.contact-wrapper .container {
  position: relative;
  z-index: 2;
}

.contact-wrapper h2 {
  margin-bottom: 20px;
}

.contact-wrapper p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

/* Modern CTA Badge */
.cta-badge {
  display: inline-block;
  background: linear-gradient(135deg, #0077cc, #00aaff);
  color: #fff;
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 119, 204, 0.3);
}

.cta-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 119, 204, 0.4);
}

/* Optional: Smooth fade-in animations for visual polish */
[data-aos] {
  transition: all 0.6s ease-in-out;
}


</style>

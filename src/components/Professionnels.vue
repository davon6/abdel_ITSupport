<script setup lang="ts">
import { onMounted } from 'vue'
import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({ duration: 800, once: true })
  new Rellax('.rellax')
})
</script>

<template>
  <header>

  </header>

  <section class="parallax-hero rellax" data-rellax-speed="-3">
    <div class="overlay"></div>
    <div class="container text-center hero-content">
      <h1>Services pour les Professionnels</h1>
      <p>Solutions fiables, adaptées et sécurisées pour TPE, PME, indépendants et professions libérales.</p>
      <router-link to="#services" class="btn-main">Découvrir nos services</router-link>
    </div>
  </section>

  <main class="container" id="services" data-aos="fade-up">
    <article class="section">
      <h2>Support & Maintenance</h2>
      <ul>
        <li>Contrats mensuels ou à la demande</li>
        <li>Téléassistance rapide (TeamViewer, AnyDesk…)</li>
        <li>Réparation express & diagnostic matériel/logiciel</li>
        <li>Mise en réseau sécurisée (LAN, Wi-Fi pro)</li>
      </ul>
    </article>

    <article class="section" data-aos="fade-up" data-aos-delay="100">
      <h2>Sécurité Informatique</h2>
      <ul>
        <li>Antivirus professionnels & pare-feu</li>
        <li>Maintenance préventive & sauvegardes automatiques</li>
        <li>Sensibilisation aux risques cyber</li>
      </ul>
    </article>

    <article class="section" data-aos="fade-up" data-aos-delay="200">
      <h2>Installation & Déploiement</h2>
      <ul>
        <li>Configuration de parc informatique complet</li>
        <li>Installation d’outils collaboratifs (Google Workspace, Office 365)</li>
        <li>Mise en place de serveurs NAS</li>
      </ul>
    </article>

    <article class="section" data-aos="fade-up" data-aos-delay="300">
      <h2>Services Web & Support Logiciel</h2>
      <ul>
        <li>Création de sites vitrines simples (WordPress, Wix)</li>
        <li>Conseils hébergement, nom de domaine & référencement local</li>
        <li>Aide à l’utilisation et migration de logiciels métier</li>
      </ul>
    </article>

    <article class="section" data-aos="fade-up" data-aos-delay="400">
      <h2>Avantages ShoTech</h2>
      <ul>
        <li>Réactivité : assistance sous 24h</li>
        <li>Expertise claire et pédagogique</li>
        <li>Interventions flexibles : à distance, domicile ou entreprise</li>
        <li>Confidentialité garantie des données</li>
      </ul>
    </article>
  </main>
</template>

<style scoped>
/* Basic reset and container */
.container {
  max-width: 900px;
  margin: 2em auto;
  padding: 0 1em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

/* Header nav */
nav {
  background: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  padding: 1em 0;
}
.nav-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 2em;
}
.nav-links li a {
  color: #34495e;
  text-decoration: none;
  font-weight: 600;
}
.nav-links li a.active {
  color: #007BFF;
  border-bottom: 2px solid #007BFF;
  padding-bottom: 0.2em;
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
  z-index: 0;
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

/* Section styling */
.section {
  margin-bottom: 3em;
}
.section h2 {
  color: #34495e;
  font-weight: 700;
  margin-bottom: 0.75em;
  border-bottom: 2px solid #007BFF;
  padding-bottom: 0.3em;
}
.section ul {
  list-style-type: disc;
  padding-left: 1.5em;
  color: #555;
}
.section ul li {
  margin-bottom: 0.6em;
  line-height: 1.3;
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
</style>

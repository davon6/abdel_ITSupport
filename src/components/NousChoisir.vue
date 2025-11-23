<script setup lang="ts">
import { onMounted } from 'vue'
import Rellax from 'rellax'
import AOS from 'aos'
import 'aos/dist/aos.css'

const advantages = [
  {
    title: '💡 Expertise & conseils personnalisés',
    description: `ShoTech est composée d'experts ayant une expérience significative dans la gestion et l’optimisation de votre parc informatique.
Nos techniciens qualifiés analysent vos besoins et vous apportent une solution adaptée, durable et sécurisée.`
  },
  {
    title: '⚡ Rapidité & efficacité',
    description: `- Intervention express à distance ou sur site, diagnostic immédiat pour les urgences.
- Intervention à domicile pour les particuliers et sur site pour les professionnels sous 24h.
- Forfaits de maintenance adaptés aux besoins de chaque entreprise (support illimité, maintenance préventive, sécurité).`
  },
  {
    title: '💰 Tarifs clairs & sans surprise',
    description: `Un devis précis avant toute intervention.
Pas de frais cachés.
Diagnostique gratuit.`
  },
  {
    title: '🔒 Confidentialité & sécurité',
    description: `Nous anticipons les menaces pour mieux protéger vos systèmes.
Nos surveillants maintiennent vos systèmes 24h/24 et interviennent en cas d’urgence sur site ou en télémaintenance.`
  },
  {
    title: 'Fonctionnement optimal du parc informatique',
    description: `Accompagnement personnalisé : audit, conseil, suivi.
Techniciens de maintenance, administrateurs systèmes et réseau, ingénieurs systèmes et réseau et ingénieurs en cybersécurité sont à votre écoute.`
  }
]

onMounted(() => {
  AOS.init({ duration: 800, once: true })
  new Rellax('.rellax')
})
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="parallax-hero rellax" data-rellax-speed="-3">
      <div class="overlay"></div>
      <div class="container text-center">
        <h1>Pourquoi choisir ShoTech ?</h1>
        <p>Des solutions informatiques fiables, sécurisées et adaptées à vos besoins.</p>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="wave-divider">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z" fill="#f4f4f9"></path>
      </svg>
    </div>

    <!-- Advantages Section -->
    <section class="section-light advantages-wrapper">
      <div class="container">
        <div
          v-for="(item, index) in advantages"
          :key="index"
          class="advantage-card"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.parallax-hero {
  position: relative;
  background-image: url('/digitization.jpg'); /* reuse homepage hero */
  background-size: cover;
  background-position: center;
  min-height: 70vh;
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

.wave-divider svg {
  display: block;
  width: 100%;
  height: 80px;
}

.advantages-wrapper {
  padding: 80px 20px;
  background: #fff;
}

.advantage-card {
  margin-bottom: 40px;
  padding: 25px;
  border-radius: 12px;
  background: #f4f4f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.advantage-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #0077cc; /* primary theme color */
}

.advantage-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

@media (min-width: 768px) {
  .advantages-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}
</style>

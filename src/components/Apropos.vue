<template>
  <div class="about-page">
    <!-- Text Section -->
    <section class="about-text">
      <p>
        Bonjour et bienvenue !<br />

Je m'appelle [Votre Nom] et je cumule plus de 10 ans d'expérience dans le support informatique et l'administration système. Mon objectif est simple : offrir des solutions fiables, efficaces et adaptées à vos besoins.  

Chaque projet est pour moi l'occasion de mettre mon expertise au service de votre succès, en combinant réactivité, savoir-faire technique et proximité. Chez [Nom de votre entreprise], nous valorisons la confiance, la transparence et la qualité du service.  

Que vous ayez besoin d'assistance ponctuelle ou d'une gestion complète de votre infrastructure, je suis là pour vous accompagner, avec sérieux… et une bonne dose de passion pour l'informatique !

      </p>
    </section>

    <!-- Map Section -->
    <section class="about-map">
      <div id="map" style="height: 400px; width: 100%"></div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default defineComponent({
  name: "Apropos",
  setup() {
    onMounted(() => {
      // Initialize map
      const map = L.map("map").setView([48.8566, 2.3522], 8);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a circle
      L.circle([48.8566, 2.3522], {
        radius: 50000,
        color: "blue",
        fillColor: "lightblue",
        fillOpacity: 0.3,
      })
        .addTo(map)
        .bindPopup("Notre emplacement");
    });
  },
});
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.6;
}

.about-map {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

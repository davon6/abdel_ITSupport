<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const sections = [
  { id: "depannage", label: "🔧 Dépannage" },
  { id: "installation", label: "📦 Installation" },
  { id: "sauvegarde", label: "☁️ Sauvegarde" },
  { id: "assistance", label: "📱 Assistance" },
  { id: "formation", label: "🧓 Formation" },
];

const activeTab = ref(sections[0].id);

function openTab(id: string) {
  activeTab.value = id;
  router.replace({ hash: `#${id}` });
}

onMounted(() => {
  if (route.hash) {
    const id = route.hash.replace("#", "");
    if (sections.some(s => s.id === id)) {
      nextTick(() => {
        activeTab.value = id;
      });
    }
  }
});
</script>

<template>
  <div id="page-content" class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Browser-like Tabs -->
    <div class="tabs-container">
      <ul class="tabs-list">
        <li
          v-for="section in sections"
          :key="section.id"
          @click="openTab(section.id)"
          :class="['tab-item', { active: activeTab === section.id }]"
        >
          {{ section.label }}
        </li>
      </ul>
    </div>

    <!-- Content area framed under tabs -->
    <main class="tab-content">
      <section v-if="activeTab === 'depannage'" id="depannage">
        <h2>🔧 Dépannage informatique</h2>
        <ul>
          <li>Réparation de PC / Mac (système lent, bugs, écran bleu...)</li>
          <li>Suppression de virus, malware, publicités</li>
          <li>Optimisation des performances</li>
          <li>Réinstallation complète ou mise à jour OS</li>
        </ul>
      </section>

      <section v-if="activeTab === 'installation'" id="installation">
        <h2>📦 Installation & Configuration</h2>
        <ul>
          <li>Installation : imprimante, périphériques, réseaux, Wi-Fi</li>
          <li>Configuration email, cloud, antivirus</li>
          <li>Mise en place du Wi-Fi</li>
        </ul>
      </section>

      <section v-if="activeTab === 'sauvegarde'" id="sauvegarde">
        <h2>☁️ Sauvegarde & Données</h2>
        <ul>
          <li>Sauvegarde sur disque dur ou cloud</li>
          <li>Récupération de données perdues</li>
          <li>Clonage de disque dur ou transfert SSD</li>
          <li>Sécurisation navigation</li>
        </ul>
      </section>

      <section v-if="activeTab === 'assistance'" id="assistance">
        <h2>📱 Assistance Mobile</h2>
        <ul>
          <li>Aide smartphones et tablettes</li>
          <li>Connexion téléphone ⇄ PC</li>
          <li>Installation d’applications utiles</li>
        </ul>
      </section>

      <section v-if="activeTab === 'formation'" id="formation">
        <h2>🧓 Formation à domicile</h2>
        <ul>
          <li>Initiation informatique : PC, emails, Internet</li>
          <li>Séances personnalisées pour seniors</li>
          <li>Sensibilisation sécurité numérique</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* --- Tabs Styling (browser-like) --- */
.tabs-container {
  background: #e5e7eb; /* light gray bg */
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
}

.tabs-list {
  display: flex;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tab-item {
  padding: 10px 20px;
  background: #d1d5db;
  border: 1px solid #ccc;
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #444;
  transition: background 0.2s;
}

.tab-item:hover {
  background: #cbd5e1;
}

.tab-item.active {
  background: #fff;
  color: #1d4ed8; /* blue text */
  font-weight: 600;
  position: relative;
  top: 1px; /* lift active tab slightly */
  z-index: 10;
}

/* --- Content box under tabs --- */
.tab-content {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0 8px 8px 8px;
  padding: 20px;
  margin: 0 auto;
  width: 90%;
  max-width: 900px;
  animation: fadeIn 0.3s ease-in-out;
}

.tab-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.tab-content ul {
  list-style: disc;
  padding-left: 1.5rem;
  line-height: 1.6;
}

/* Footer */
.footer {
  background: #2563eb;
  color: white;
  text-align: center;
  padding: 15px;
  margin-top: auto;
  border-top: 1px solid #1e40af;
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 768px) {
  .tabs-container {
    justify-content: flex-start;
    overflow: hidden;
  }

  .tabs-list {
    flex-wrap: wrap;         /* allow wrapping to new rows */
    justify-content: flex-start;
    gap: 4px;
  }

  .tab-item {
    flex: 1 0 auto;          /* don't shrink too much */
    min-width: 130px;        /* force wrapping when screen too small */
    text-align: center;
    padding: 8px 10px;
    border-radius: 6px 6px 0 0;
    border: 1px solid #ccc;
    border-bottom: none;
    background: #e5e7eb;
    font-size: 0.9rem;
  }

  .tab-item.active {
    background: #fff;
    color: #1d4ed8;
    font-weight: bold;
    z-index: 10;
  }

  .tab-content {
    border-radius: 0 0 2px 2px;
    margin-top: 0;
    width : 85% !important;
  }

    .tab-content h2 {
    font-size: 1.2rem !important;
  }

  
}

.tab-content {
  background: #fff;
  border: 3px double #bbb;   /* double border frame */
  border-radius: 10px;
  padding: 30px;
  margin: 20px auto;
  width: 90%;
  max-width: 900px;
  animation: fadeIn 0.3s ease-in-out;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.tab-content h2 {
  font-size: 1.7rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
  color: #1d4ed8; /* highlight blue */
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
}

.tab-content ul {
  list-style: disc;
  padding-left: 1.5rem;
  line-height: 1.8;
  font-size: 1.05rem;
}

.tab-content li {
  margin-bottom: 8px;
}
</style>

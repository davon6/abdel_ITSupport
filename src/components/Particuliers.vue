<script setup lang="ts">
import { ref, onMounted, nextTick, computed  } from "vue";
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
const tarifVisible = ref(false);

// Pricing table data
const tarifs = ref([
  { category: "Dépannage & assistance", service: "Nettoyage, virus, bugs, lenteurs", detail: "PC/Mac, box Internet, imprimante, logiciel", prix: 49, unit: "€/h", location: "Intervention à distance / domicile (Lyon)" },
  { category: "Dépannage & assistance", service: "Dépannage express (dans la journée)", detail: "Intervention rapide", prix: 79, unit: "€/h", location: "Intervention à distance / domicile (Lyon)" },
  { category: "Maintenance & sécurité", service: "Forfait sérénité", detail: "Nettoyage régulier, antivirus, MAJ", prix: 14, unit: "€/mois", location: "-" },
  { category: "Maintenance & sécurité", service: "Sécurisation ordinateur", detail: "Antivirus, pare-feu, nettoyage", prix: 69, unit: "€", location: "-" },
  { category: "Maintenance & sécurité", service: "Installation + configuration", detail: "-", prix: 59, unit: "€", location: "-" },
  { category: "Maintenance & sécurité", service: "Sauvegarde Cloud (5 Go inclus)", detail: "-", prix: 0, unit: "-", location: "-" },
  { category: "Services complémentaires", service: "Installation PC ou imprimante", detail: "À domicile, y compris configuration", prix: 59, unit: "€", location: "-" },
  { category: "Services complémentaires", service: "Transfert de données", detail: "Migration de données (USB, disque dur, cloud)", prix: 49, unit: "€", location: "-" },
  { category: "Services complémentaires", service: "Réinstallation complète (Windows/Mac)", detail: "Système, drivers, MAJ, antivirus", prix: 89, unit: "€", location: "-" },
]);

// Sorting
const sortColumn = ref<"category" | "service" | "detail" | "prix" | "unit" | "location">("service");
const sortAsc = ref(true);



// Computed sorted tarifs
const sortedTarifs = computed(() => {
  return [...tarifs.value].sort((a, b) => {
    let valA = a[sortColumn.value];
    let valB = b[sortColumn.value];
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();
    if (valA < valB) return sortAsc.value ? -1 : 1;
    if (valA > valB) return sortAsc.value ? 1 : -1;
    return 0;
  });
});

function openTab(id: string) {
  activeTab.value = id;
  router.replace({ hash: `#${id}` });
}

function openTarif() {
  tarifVisible.value = true;
  nextTick(() => document.getElementById("tarif")?.scrollIntoView({ behavior: "smooth" }));
}

function closeTarif() {
  tarifVisible.value = false;
  document.getElementById("page-content")?.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => {
  if (route.hash) {
    const id = route.hash.replace("#", "");
    if (sections.some(s => s.id === id)) nextTick(() => activeTab.value = id);
  }
});
</script>

<template>
  <div id="page-content" class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Tabs -->
    <div class="tabs-container">
      <ul class="tabs-list">
        <li v-for="section in sections" :key="section.id" @click="openTab(section.id)" :class="['tab-item', { active: activeTab === section.id }]">
          {{ section.label }}
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <main class="tab-content relative">
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

      <!-- Tiny Open Tarif Button -->
      <svg @click="openTarif" xmlns="http://www.w3.org/2000/svg"
     class="fixed bottom-2 right-2 cursor-pointer z-50"
     style="width:8mm; height:8mm; stroke-width:1.2; color:#2563eb;"
     fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
</svg>


    </main>

    <!-- Tarif Section -->
    <section v-show="tarifVisible" id="tarif" class="tab-content mt-4 relative">
      <h2>💶 Tarif</h2>

      <!-- Tiny Close Button -->
      <svg @click="closeTarif" xmlns="http://www.w3.org/2000/svg"
     class="absolute top-2 right-2 cursor-pointer z-50"
     style="width:8mm; height:8mm; stroke-width:1.2; color:#dc2626;"
     fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

<!-- Light Grid Pricing Table -->
<div class="overflow-x-auto mt-4" id="test">
  <table class="min-w-full border-collapse border-4 border-red-600 text-left">
    <thead class="bg-yellow-200">
      <tr>
        <th class="px-3 py-2 border-4 border-blue-600 cursor-pointer">Catégorie</th>
        <th class="px-3 py-2 border-4 border-blue-600 cursor-pointer">Service</th>
        <th class="px-3 py-2 border-4 border-blue-600 cursor-pointer">Détail</th>
        <th class="px-3 py-2 border-4 border-blue-600 cursor-pointer">Prix</th>
        <th class="px-3 py-2 border-4 border-blue-600">Lieu</th>
      </tr>
    </thead>
    <tbody class="bg-green-200">
      <tr v-for="(item, index) in sortedTarifs" :key="index" class="hover:bg-pink-300">
        <td class="px-3 py-2 border-4 border-purple-600">{{ item.category }}</td>
        <td class="px-3 py-2 border-4 border-purple-600">{{ item.service }}</td>
        <td class="px-3 py-2 border-4 border-purple-600">{{ item.detail }}</td>
        <td class="px-3 py-2 border-4 border-purple-600">{{ item.prix }} {{ item.unit }}</td>
        <td class="px-3 py-2 border-4 border-purple-600">{{ item.location }}</td>
      </tr>
    </tbody>
  </table>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- Tabs Styling (browser-like) --- */

table { border-collapse: collapse; }
th, td { border: 1px solid #cbd5e1; }



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
  #tarif table {
    font-size: 0.7rem; /* very small on mobile */
  }

  #tarif th, #tarif td {
    padding: 0.25rem 0.5rem; /* shrink padding too */
  }


  #tarif table th,
  #tarif table td,
  #test {
    padding: 0 !important; /* remove all padding on mobile */
 left : 0 !important; 
  }
  #test #tarif .overflow-x-auto {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

 #test #tarif table {
    margin-left: 0 !important;
    margin-right: 0 !important;
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

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

const emits = defineEmits(['close', 'navigate'])

const props = defineProps({
  visible: Boolean
})

const step = ref(1)

const particulierServices = [
  { label: "Dépannage informatique", anchor: "depannage" },
  { label: "Installation et configuration", anchor: "installation" },
  { label: "Sauvegarde & données", anchor: "sauvegarde" },
  { label: "Assistance mobile", anchor: "assistance-mobile" },
  { label: "Formation à domicile", anchor: "formation" },
]

function selectProfessionnel() {
  emits('navigate', '/professionels')
  emits('close')
}

function selectParticulier() {
  step.value = 2
}

function selectParticulierService(service) {
  emits('navigate', `/particuliers#${service.anchor}`)
  emits('close')
}

function backToStep1() {
  step.value = 1
}
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="emits('close')">
    <div class="modal-content">
      <template v-if="step === 1">
        <h2>Choisissez votre profil</h2>
        <div class="choices">
          <button @click="selectParticulier" class="btn-secondary">Particulier</button>
          <button @click="selectProfessionnel" class="btn-primary">Professionnel</button>
        </div>
      </template>

      <template v-if="step === 2">
        <h2>Choisissez un service particulier</h2>
        <ul class="service-list">
          <li v-for="service in particulierServices" :key="service.anchor">
            <button @click="selectParticulierService(service)">
              {{ service.label }}
            </button>
          </li>
        </ul>
        <button class="btn-link" @click="backToStep1">← Retour</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Copy the styles from previous modal here */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
}

.modal-content {
  background: white;
  padding: 2em;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}
.choices {
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
}
</style>

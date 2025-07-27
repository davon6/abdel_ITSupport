<script setup>
import { ref, watch, onUnmounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue'
const isSupportModalOpen = ref(false);

const openSupportModal = () => {
  isSupportModalOpen.value = true;
};

const closeSupportModal = () => {
  isSupportModalOpen.value = false;
};

watch(isSupportModalOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto';
});

// Clean up on unmount
onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
</script>




<template>
  <!-- Optional: global logo or header visible on every page -->
  <img class="logo" src="/business.jpg" alt="ShoTech logo" />

  <!-- Route views -->
  <AppHeader />
  <router-view />

</template>

<style>
body {
  background-color: #e6f0ff; /* light blue */
  overflow-x: hidden;
  max-width: 100vw;
}

html{
  overflow-x: hidden;
  max-width: 100vw;
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>

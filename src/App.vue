<script setup lang="ts">
</script>

<template>
  <!-- Optional: global logo or header visible on every page -->
  <img class="logo" src="/business.jpg" alt="ShoTech logo" />

  <!-- Route views -->
  <router-view />
</template>

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

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Content Area -->
    <main class="flex-1 bg-gray-900 text-white w-full mt-20">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
/* Ensure the body and html take up full height */
html, body {
  height: 100%;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

/* Ensure the root container takes up full height */
.flex-col {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

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

<template>
  <nav class="bg-gray-900 text-white shadow-lg fixed top-0 inset-x-0 z-50 backdrop-blur-lg">
    <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
      
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
          EduPlus Campus
        </div>
      </div>

      <!-- Logged In User Info -->
      <div class="flex items-center space-x-4">
        <span v-if="username" class="text-sm font-medium text-white">{{ username }}</span>
        <svg class="w-8 h-8 text-blue-400 cursor-pointer hover:text-blue-300 transition" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zm0 1.5c-3.1 0-9 1.554-9 4.5V21h18v-3c0-2.946-5.9-4.5-9-4.5z"/>
        </svg>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const username = ref('');

// Fetch user data from localStorage
onMounted(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    username.value = storedUsername;
  }
});
</script>

<style scoped>
/* Additional scoped styles */
nav {
  backdrop-filter: blur(10px);
}

/* Optional: Shadow effect on scroll */
nav.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

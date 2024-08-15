<!-- src/components/ProfileMenu.vue -->
<template>
    <div class="relative">
      <button @click="toggleMenu" class="flex items-center space-x-2 hover:text-blue-400">
        <span>{{ userEmail }}</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div v-if="menuOpen" class="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg">
        <ul>
          <li v-if="isAdmin">
            <a href="/create-student" class="block px-4 py-2 hover:bg-gray-700">Create Student</a>
          </li>
          <li v-if="isAdmin">
            <a href="/delete-student" class="block px-4 py-2 hover:bg-gray-700">Delete Student</a>
          </li>
          <li>
            <a href="/update-student" class="block px-4 py-2 hover:bg-gray-700">Update Student</a>
          </li>
          <li>
            <a href="/view-profile" class="block px-4 py-2 hover:bg-gray-700">View Profile</a>
          </li>
          <li v-if="isAdmin">
            <a href="/view-all-students" class="block px-4 py-2 hover:bg-gray-700">View All Students</a>
          </li>
          <li v-if="isAdmin">
            <a href="/view-student" class="block px-4 py-2 hover:bg-gray-700">View Student</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const menuOpen = ref(false);
  const userEmail = localStorage.getItem('userEmail') || 'User';
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  
  function toggleMenu() {
    menuOpen.value = !menuOpen.value;
  }
  </script>
  
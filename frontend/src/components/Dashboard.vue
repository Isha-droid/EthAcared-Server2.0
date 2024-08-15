<template>
    <div class="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 class="text-4xl font-bold mb-6">
        {{ isAdmin ? 'Admin Dashboard' : 'User Dashboard' }}
      </h1>
  
      <div v-if="isAdmin" class="space-y-6">
        <h2 class="text-3xl font-semibold">Admin Actions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/create-student" class="bg-green-600 px-6 py-3 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-between">
            <span>Create Student</span>
            <svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/delete-student" class="bg-red-600 px-6 py-3 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out flex items-center justify-between">
            <span>Delete Student</span>
            <svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/view-all-students" class="bg-blue-600 px-6 py-3 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-between">
            <span>View All Students</span>
            <svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
  
      <div v-else class="space-y-6">
        <h2 class="text-3xl font-semibold">User Actions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/view-student" class="bg-blue-600 px-6 py-3 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-between">
            <span>View Student</span>
            <svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/update-student" class="bg-yellow-600 px-6 py-3 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 ease-in-out flex items-center justify-between">
            <span>Update Student</span>
            <svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/profile" class="bg-blue-600 px-6 py-3 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-between">
            <span>View Profile</span>
            <svg class="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // Safely fetch and parse user data from local storage
  let userRole = '';
  try {
    const user = localStorage.getItem('user');
    userRole = user || '';
    alert(user)
  } catch (error) {
    console.error('Failed to parse user data:', error);
  }
  
  // Computed properties to determine if the user is an admin
  const isAdmin = computed(() => userRole === 'admin');
  </script>
  
  <style scoped>
  /* Dark theme styles */
  .bg-gray-900 {
    background-color: #1a202c;
  }
  
  .text-gray-100 {
    color: #f7fafc;
  }
  
  /* Light components styles */
  .bg-green-600 {
    background-color: #2f855a;
  }
  
  .bg-green-700 {
    background-color: #276749;
  }
  
  .bg-red-600 {
    background-color: #c53030;
  }
  
  .bg-red-700 {
    background-color: #9b2c2c;
  }
  
  .bg-blue-600 {
    background-color: #3182ce;
  }
  
  .bg-blue-700 {
    background-color: #2b6cb0;
  }
  
  .bg-yellow-600 {
    background-color: #d69e2e;
  }
  
  .bg-yellow-700 {
    background-color: #b7791f;
  }
  </style>
  
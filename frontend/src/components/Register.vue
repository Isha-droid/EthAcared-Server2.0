<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <div class="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-8 text-center">Register</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label for="username" class="block text-sm mb-1">Username</label>
          <input id="username" v-model="form.username" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>
        <div class="mb-6">
          <label for="email" class="block text-sm mb-1">Email</label>
          <input id="email" v-model="form.email" type="email" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm mb-1">Password</label>
          <input id="password" v-model="form.password" type="password" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>
        <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = ref({
  username: '',
  email: '',
  password: ''
});

const router = useRouter();

async function handleSubmit() {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', form.value);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      alert('Registration successful! Redirecting to login.');
      router.push('/login'); // Redirect to login page
    }
  } catch (error) {
    console.error('An error occurred during registration:', error);
    alert('Registration failed. Please try again.');
  }
}
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>

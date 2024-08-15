<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="relative overflow-hidden bg-gray-900">
    <!-- Hero Section -->
    <div class="relative z-10 px-6 py-16 sm:px-16 lg:px-24 lg:py-24">
      <div class="max-w-5xl mx-auto text-center">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4 animate__animated animate__fadeIn animate__delay-1s">Welcome to EduPlus Campus</h1>
        <p class="mt-4 text-lg text-gray-200 sm:text-xl animate__animated animate__fadeIn animate__delay-2s">Securely manage student credentials with blockchain technology.</p>
        <div class="mt-8 flex flex-col justify-center items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <a href="#features" class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">Explore Features</a>
          <a href="#contact" class="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 animate__animated animate__fadeIn animate__delay-4s">Contact Us</a>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <section id="features" class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-6 sm:px-16">
        <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-8 animate__animated animate__fadeIn">Our Key Features</h2>
        <div class="mt-12 grid gap-8 lg:grid-cols-3">
          <div class="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-1s">
            <h3 class="text-xl font-semibold text-gray-900">Secure Blockchain Storage</h3>
            <p class="mt-4 text-gray-600">Store student credentials on a secure blockchain, ensuring transparency and immutability.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-2s">
            <h3 class="text-xl font-semibold text-gray-900">Easy Access and Management</h3>
            <p class="mt-4 text-gray-600">Simple and intuitive interfaces for students and administrators to manage and access records.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-3s">
            <h3 class="text-xl font-semibold text-gray-900">Advanced Security Features</h3>
            <p class="mt-4 text-gray-600">Enhanced security measures, including encryption and secure authentication.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 bg-gray-900 text-white">
      <div class="max-w-4xl mx-auto px-6 sm:px-16">
        <h2 class="text-3xl font-extrabold text-center mb-8 animate__animated animate__fadeIn">Get In Touch</h2>
        <form class="mt-8 space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            <input type="text" placeholder="Name" class="p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"/>
            <input type="email" placeholder="Email" class="p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"/>
          </div>
          <textarea placeholder="Message" rows="4" class="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"></textarea>
          <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">Send Message</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Import Animate.css for animations */
@import 'animate.css/animate.min.css';

/* Additional scoped styles */
</style>

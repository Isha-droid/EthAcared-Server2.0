<template>
  <div class="max-w-xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Student</h2>
    <form @submit.prevent="createStudent">
      <div class="mb-4">
        <label for="name" class="block text-sm mb-1">Student Name</label>
        <input v-model="name" id="name" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm mb-1">Email</label>
        <input v-model="email" id="email" type="email" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="department" class="block text-sm mb-1">Department</label>
        <input v-model="department" id="department" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="marksheet" class="block text-sm mb-1">Marksheet</label>
        <input @change="handleFileUpload" id="marksheet" type="file" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm mb-1">Phone</label>
        <input v-model="phone" id="phone" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="homeAddress" class="block text-sm mb-1">Home Address</label>
        <input v-model="homeAddress" id="homeAddress" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="dob" class="block text-sm mb-1">Date of Birth</label>
        <input v-model="dob" id="dob" type="date" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300">Create Student</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { generateHash } from './hashUtils/GenerateHash';

const name = ref('');
const email = ref('');
const department = ref('');
const marksheetHash = ref('');
const phone = ref('');
const homeAddress = ref('');
const dob = ref('');

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    try {
      const hash = await generateHash(file);
      marksheetHash.value = hash;
    } catch (error) {
      console.error('Error generating hash:', error);
    }
  }
}

// Generate SHA-256 hash for a file


async function createStudent() {
  try {
    const response = await axios.post('http://localhost:3000/api/ethereum/create-student', {
      name: name.value,
      email: email.value,
      department: department.value,
      marksheet: marksheetHash.value, // Send the hash as the marksheet
      phone: phone.value,
      homeAddress: homeAddress.value,
      dob: dob.value,
    });
    alert('Student created successfully!');
    console.log(response);
    // Clear form fields
    name.value = '';
    email.value = '';
    department.value = '';
    marksheetHash.value = '';
    phone.value = '';
    homeAddress.value = '';
    dob.value = '';
  } catch (error) {
    console.error('Error creating student:', error);
    alert('Failed to create student. Please try again.');
  }
}
</script>

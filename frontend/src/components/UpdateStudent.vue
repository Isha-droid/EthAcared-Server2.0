<!-- src/components/UpdateStudent.vue -->
<template>
  <div class="max-w-xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Update Student</h2>
    <form @submit.prevent="updateStudent">
      <div class="mb-4">
        <label for="studentId" class="block text-sm mb-1">Student ID</label>
        <input v-model="studentId" id="studentId" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="name" class="block text-sm mb-1">Student Name</label>
        <input v-model="name" id="name" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm mb-1">Email</label>
        <input v-model="email" id="email" type="email" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm mb-1">Phone</label>
        <input v-model="phone" id="phone" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="department" class="block text-sm mb-1">Department</label>
        <input v-model="department" id="department" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="homeAddress" class="block text-sm mb-1">Home Address</label>
        <input v-model="homeAddress" id="homeAddress" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300">Update Student</button>
    </form>

    <div v-if="updateResult" class="mt-6 p-4 bg-gray-700 rounded-lg">
      <h3 class="text-lg font-semibold">Update Result</h3>
      <p><strong>Status:</strong> {{ updateResult.status === '1' ? 'Success' : 'Failed' }}</p>
      <p><strong>Transaction Hash:</strong> {{ updateResult.transactionHash }}</p>
      <p><strong>Student ID:</strong> {{ updateResult.studentId }}</p>
      <p><strong>Name:</strong> {{ updateResult.name }}</p>
      <p><strong>Department:</strong> {{ updateResult.department }}</p>
      <p><strong>Email:</strong> {{ updateResult.email }}</p>
      <p><strong>Phone:</strong> {{ updateResult.phone }}</p>
      <p><strong>Home Address:</strong> {{ updateResult.homeAddress }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const studentId = ref('');
const name = ref('');
const email = ref('');
const phone = ref('');
const department = ref('');
const homeAddress = ref('');
const updateResult = ref(null);

async function updateStudent() {
  try {
    const response = await axios.post(`http://localhost:3000/api/ethereum/update-student/${studentId.value}`, {
      name: name.value,
      email: email.value,
      phone: phone.value,
      department: department.value,
      homeAddress: homeAddress.value,
    });
    updateResult.value = {
      status: response.data.status,
      transactionHash: response.data.result.transactionHash,
      studentId: response.data.result.events.StudentUpdated.returnValues.prn,
      name: response.data.result.events.StudentUpdated.returnValues.name,
      department: response.data.result.events.StudentUpdated.returnValues.department,
      email: response.data.result.events.StudentUpdated.returnValues.email,
      phone: response.data.result.events.StudentUpdated.returnValues.phone,
      homeAddress: response.data.result.events.StudentUpdated.returnValues.homeAddress,
    };
    alert('Student updated successfully!');
    // Clear form fields
    studentId.value = '';
    name.value = '';
    email.value = '';
    phone.value = '';
    department.value = '';
    homeAddress.value = '';
  } catch (error) {
    console.error('Error updating student:', error);
    alert('Failed to update student. Please try again.');
  }
}
</script>

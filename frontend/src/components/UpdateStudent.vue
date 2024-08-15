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
      <div class="mb-4">
        <label for="marks" class="block text-sm mb-1">Marks</label>
        <input v-model="marks" id="marks" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="dob" class="block text-sm mb-1">Date of Birth</label>
        <input v-model="dob" id="dob" type="date" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
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
      <p><strong>Marks:</strong> {{ updateResult.marks }}</p>
      <p><strong>Date of Birth:</strong> {{ updateResult.dob }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const studentId = ref('');
const name = ref('');
const email = ref('');
const phone = ref('');
const department = ref('');
const homeAddress = ref('');
const marks = ref('');
const dob = ref('');
const updateResult = ref(null);

onMounted(() => {
  const student = JSON.parse(route.query.student);
  if (student) {
    studentId.value = student.prn;
    name.value = student.name;
    email.value = student.email;
    phone.value = student.phone;
    department.value = student.department;
    homeAddress.value = student.homeAddress;
    marks.value = student.marksheet ;
    dob.value = student.dob;
  }
});

async function updateStudent() {
  try {
    // Create the body object
    const body = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      department: department.value,
      homeAddress: homeAddress.value,
      marksheet: marks.value,
      dob: dob.value,
    };

    // Log the body object
    console.log('Body object:', body);

    // Send the POST request with the body object
    const response = await axios.post(`http://localhost:3000/api/ethereum/update-student/${studentId.value}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Update the result with the response data
    updateResult.value = {
      status: response.data.status,
      transactionHash: response.data.transactionHash,
      studentId: studentId.value,
      ...body,
    };
  } catch (error) {
    // Log more details about the error response
    if (error.response) {
      console.error('Failed to update student:', {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error('Failed to update student:', error.message);
    }
    alert('Failed to update student: ' + (error.response?.data?.message || error.message));
  }
}


</script>

<style scoped>
/* Scoped styles for the form */
form {
  display: flex;
  flex-direction: column;
}

input {
  font-size: 1rem;
}
</style>

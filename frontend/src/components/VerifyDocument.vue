<template>
  <div class="max-w-xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Verify Document</h2>
    <!-- Input for PRN and document upload fields -->
    <div class="mb-4">
      <label for="prn" class="block text-sm mb-1">Enter PRN</label>
      <input v-model="prn" id="prn" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" @keyup.enter="fetchStudentDetails" required />
    </div>
    <button @click="fetchStudentDetails" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 mb-6">Fetch Details</button>

    <!-- Student Details and verification -->
    <div v-if="student" class="mt-6">
      <h3 class="text-xl font-bold mb-4">Student Details</h3>
      <p><strong>Name:</strong> {{ student.name }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Department:</strong> {{ student.department }}</p>
      <p><strong>Phone:</strong> {{ student.phone }}</p>
      <p><strong>Date of Birth:</strong> {{ student.dob }}</p>
      
      <div class="mt-4">
        <label for="uploadDocument" class="block text-sm mb-1">Upload Document to Verify</label>
        <input @change="handleFileUpload" id="uploadDocument" type="file" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      
      <button @click="verifyDocument" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300 mt-4">Verify Document</button>
    </div>
    
    <div v-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { generateHash } from './hashUtils/GenerateHash';

const prn = ref('');
const student = ref(null);
const uploadedFile = ref(null);
const errorMessage = ref('');
const marksheetHash = ref(''); // Add this to store the marksheet hash for verification

async function fetchStudentDetails() {
  try {
    const response = await axios.get(`http://localhost:3000/api/ethereum/view-student/${prn.value}`);
    if (response.status === 200 && response.data.student) {
      student.value = response.data.student;
      marksheetHash.value = student.value.marksheet; // Store the fetched marksheet hash
      errorMessage.value = ''; // Clear any previous error messages
    } else {
      student.value = null;
      errorMessage.value = 'Student not found';
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
    errorMessage.value = 'Error fetching student details';
  }
}

function handleFileUpload(event) {
  uploadedFile.value = event.target.files[0];
}

async function verifyDocument() {
  if (!uploadedFile.value) {
    alert('Please upload a document to verify.');
    return;
  }

  try {
    const documentHash = await generateHash(uploadedFile.value);
    if (documentHash === marksheetHash.value) {
      alert('Document verified successfully!');
    } else {
      alert('Document verification failed. The document may be fake or altered.');
    }
  } catch (error) {
    console.error('Error verifying document:', error);
    errorMessage.value = 'Error verifying document';
  }
}
</script>

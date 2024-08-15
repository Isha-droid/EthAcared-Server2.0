<template>
    <div class="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 class="text-4xl font-bold mb-6">View Students</h1>
  
      <div v-if="loading" class="text-center text-gray-400">Loading...</div>
      <div v-if="error" class="text-center text-red-500">{{ error }}</div>
  
      <table v-if="!loading && !error" class="w-full bg-gray-800 rounded-lg shadow-lg">
        <thead>
          <tr class="bg-gray-700 text-white">
            <th class="p-4">PRN</th>
            <th class="p-4">Name</th>
            <th class="p-4">Department</th>
            <th class="p-4">Marks</th>
            <th class="p-4">Phone</th>
            <th class="p-4">Email</th>
            <th class="p-4">Address</th>
            <th class="p-4">DOB</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.prn" class="border-b border-gray-700 hover:bg-gray-600">
            <td class="p-4">{{ student.prn }}</td>
            <td class="p-4">{{ student.name }}</td>
            <td class="p-4">{{ student.department }}</td>
            <td class="p-4">{{ student.marksheet }}</td>
            <td class="p-4">{{ student.phone }}</td>
            <td class="p-4">{{ student.email }}</td>
            <td class="p-4">{{ student.homeAddress }}</td>
            <td class="p-4">{{ student.dob }}</td>
            <td class="p-4 flex items-center space-x-2">
              <svg @click="updateStudent(student.prn)" class="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400 transition" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <router-link :to="{ name: 'delete-student', params: { prn: student.prn } }">
                <svg class="w-6 h-6 text-red-500 cursor-pointer hover:text-red-400 transition" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { useFetchStudents } from './hooks/useFetchStudents';
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const { students, loading, error } = useFetchStudents();
  const router = useRouter();
  
  const updateStudent = (prn) => {
    console.log(`Update student with PRN: ${prn}`);
    // Implement update logic here
  };
  
  const deleteStudent = async (prn) => {
    try {
      await axios.delete(`http://localhost:3000/api/ethereum/delete-student/${prn}`);
      // Fetch students again to update the list
      // fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };
  </script>
  
  <style scoped>
  /* Additional scoped styles for table */
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  thead th {
    border-bottom: 2px solid #4a5568;
  }
  
  tbody tr:hover {
    background-color: #2d3748;
  }
  
  svg {
    cursor: pointer;
    transition: color 0.3s ease;
  }
  </style>
  
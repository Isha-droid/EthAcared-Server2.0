<template>
    <div class="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 class="text-4xl font-bold mb-6">View Students</h1>
  
      <div class="mb-4">
        <input 
          v-model="department" 
          type="text" 
          placeholder="Enter department" 
          class="p-2 rounded border-gray-300"
        />
        <button 
          @click="fetchStudents" 
          class="ml-4 px-4 py-2 bg-blue-500 rounded text-white"
        >
          Fetch Students
        </button>
      </div>
  
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
              <svg @click="updateStudent(student)" class="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400 transition" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg @click="deleteStudent(student.prn)" class="w-6 h-6 text-red-500 cursor-pointer hover:text-red-400 transition" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const department = ref('');
  const students = ref([]);
  const loading = ref(false);
  const error = ref('');
  
  const router = useRouter();
  
  const fetchStudents = async () => {
    if (!department.value) {
      alert('Please enter a department.');
      return;
    }
  
    loading.value = true;
    error.value = '';
  
    try {
      const response = await axios.get(`http://localhost:3000/api/ethereum/get-students-by-department/${department.value}`);
      students.value = response.data.students;
    } catch (err) {
      error.value = 'Failed to fetch students. Please try again later.';
      console.error('Error fetching students:', err);
    } finally {
      loading.value = false;
    }
  };
  
  const updateStudent = (student) => {
    router.push({
      name: 'update-student',
      params: {
        studentId: student.prn
      },
      query: {
        student: JSON.stringify(student)
      }
    });
  };
  
  const deleteStudent = async (prn) => {
    if (confirm(`Are you sure you want to delete student with PRN: ${prn}?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/ethereum/delete-student/${prn}`);
        students.value = students.value.filter(student => student.prn !== prn);
        alert(`Deleted student with PRN: ${prn}`);
      } catch (err) {
        error.value = 'Failed to delete student. Please try again later.';
        console.error('Error deleting student:', err);
      }
    }
  };
  </script>
  
  <style scoped>
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
  
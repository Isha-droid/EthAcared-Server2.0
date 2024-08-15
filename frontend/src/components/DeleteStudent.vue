<template>
  <div class="max-w-xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Delete Student</h2>
    <form @submit.prevent="confirmDelete">
      <div class="mb-4">
        <label for="studentId" class="block text-sm mb-1">Student ID</label>
        <input v-model="studentId" id="studentId" type="text" class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required />
      </div>
      <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition duration-300">Delete Student</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const studentId = ref('');
const route = useRoute();
const router = useRouter();

onMounted(() => {
  studentId.value = route.params.prn;
});

function confirmDelete() {
  if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
    deleteStudent();
  }
}

async function deleteStudent() {
  try {
    await axios.delete(`http://localhost:3000/api/ethereum/delete-student/${studentId.value}`);
    alert('Student deleted successfully!');
    router.push('/view-students'); // Navigate back to the students list
  } catch (error) {
    console.error('Error deleting student:', error);
    alert('Failed to delete student. Please try again.');
  }
}
</script>

<style scoped>
/* Additional scoped styles */
input {
  border-color: #e53e3e;
}

button {
  background-color: #e53e3e;
}
</style>

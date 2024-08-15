<template>
    <div class="relative min-h-screen bg-gray-900 text-gray-100">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img class="w-full h-64 object-cover opacity-30" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Background Image">
      </div>
      
      <div class="relative p-6 flex flex-col items-center justify-center min-h-screen">
        <!-- Profile Card -->
        <div v-if="student" class="bg-gray-800 text-white shadow-lg rounded-lg p-6 max-w-4xl w-full z-10">
          <div class="flex flex-col md:flex-row items-center">
            <!-- Profile Picture -->
            <div class="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
              <img :src="student.profilePicture || 'https://via.placeholder.com/150'" alt="Profile Picture" class="w-32 h-32 rounded-full border-4 border-blue-600"/>
            </div>
            <!-- Profile Details -->
            <div class="flex-1">
              <h1 class="text-4xl font-bold mb-2">{{ student.name }}</h1>
              <p class="text-lg mb-2"><strong>Student ID:</strong> {{ student.prn }}</p>
              <p class="text-lg mb-2"><strong>Course:</strong> {{ student.course }}</p>
              <p class="text-lg mb-2"><strong>Phone:</strong> {{ student.phone }}</p>
              <p class="text-lg mb-2"><strong>Email:</strong> {{ student.email }}</p>
              <p class="text-lg mb-2"><strong>Institution:</strong> {{ student.institution }}</p>
              <p class="text-lg mb-2"><strong>Enrollment Date:</strong> {{ student.enrollmentDate }}</p>
              
              <!-- User Statistics -->
              <div class="mt-6 border-t border-gray-700 pt-4">
                <h2 class="text-xl font-semibold mb-2">Academic Statistics</h2>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-700 p-4 rounded-lg">
                    <h3 class="text-lg font-semibold">Completed Courses</h3>
                    <p class="text-xl">{{ student.completedCourses }}</p>
                  </div>
                  <div class="bg-gray-700 p-4 rounded-lg">
                    <h3 class="text-lg font-semibold">Current GPA</h3>
                    <p class="text-xl">{{ student.gpa }}</p>
                  </div>
                  <div class="bg-gray-700 p-4 rounded-lg">
                    <h3 class="text-lg font-semibold">Pending Assignments</h3>
                    <p class="text-xl">{{ student.pendingAssignments }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Recent Activity -->
              <div class="mt-6 border-t border-gray-700 pt-4">
                <h2 class="text-xl font-semibold mb-2">Recent Activities</h2>
                <ul>
                  <li class="bg-gray-700 p-3 rounded-lg mb-2">
                    <p class="font-semibold">Submitted assignment</p>
                    <p class="text-gray-400 text-sm">Just now</p>
                  </li>
                  <li class="bg-gray-700 p-3 rounded-lg mb-2">
                    <p class="font-semibold">Completed quiz</p>
                    <p class="text-gray-400 text-sm">2 hours ago</p>
                  </li>
                </ul>
              </div>
  
              <!-- Social Media Links -->
              <div class="mt-6 border-t border-gray-700 pt-4">
                <h2 class="text-xl font-semibold mb-2">Connect with me</h2>
                <div class="flex space-x-4">
                  <a href="https://twitter.com/yourprofile" target="_blank" class="text-blue-500 hover:text-blue-600">
                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 0 1-3.1.9 4.48 4.48 0 0 0 1.9-2.5 9.02 9.02 0 0 1-2.9 1.1A4.44 4.44 0 0 0 16 2a4.48 4.48 0 0 0-4.5 4.5c0 .35.05.7.1 1A12.7 12.7 0 0 1 2 3a4.48 4.48 0 0 0 1.5 6 4.4 4.4 0 0 1-2-.6v.1c0 2.2 1.5 4.1 3.5 4.5a4.5 4.5 0 0 1-2 .1 4.46 4.46 0 0 0 4.2 3.1A8.94 8.94 0 0 1 0 19a12.62 12.62 0 0 0 6.9 2c8.2 0 12.7-6.8 12.7-12.7v-.6a9.1 9.1 0 0 0 2.3-2.3z" />
                    </svg>
                  </a>
                  <a href="https://github.com/yourprofile" target="_blank" class="text-gray-400 hover:text-gray-300">
                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.5 2.91 8.33 6.94 9.68.5.09.68-.22.68-.49v-1.8c-2.83.61-3.42-1.36-3.42-1.36-.46-1.17-1.13-1.48-1.13-1.48-.92-.63.07-.62.07-.62 1.02.07 1.55 1.05 1.55 1.05.91 1.57 2.39 1.11 2.98.85.09-.66.36-1.11.65-1.36-2.32-.26-4.77-1.16-4.77-5.17 0-1.14.41-2.07 1.08-2.8-.11-.26-.47-1.31.1-2.72 0 0 .88-.28 2.88 1.08.84-.23 1.74-.35 2.64-.36.9.01 1.8.12 2.64.36 2-1.36 2.88-1.08 2.88-1.08.58 1.41.21 2.46.1 2.72.67.73 1.08 1.66 1.08 2.8 0 4.01-2.45 4.91-4.78 5.17.37.31.69.92.69 1.85v2.72c0 .27.17.58.68.49C21.09 20.33 24 16.5 24 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" class="text-blue-700 hover:text-blue-800">
                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.23 22.23h-4.54v-6.14c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.59-2.34 3.23v6.25H8.11V9.09h4.36v1.69h.06c.62-1.17 2.13-2.4 4.38-2.4 4.68 0 5.54 3.09 5.54 7.1v6.35zm-14.38-14.43c-1.4 0-2.55-1.14-2.55-2.55s1.14-2.55 2.55-2.55c1.4 0 2.55 1.14 2.55 2.55s-1.14 2.55-2.55 2.55zm-1.47 14.43h2.96v-6.14c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.59-2.34 3.23v6.25h2.96zM1.3 22.23h2.95v-13.14H1.3v13.14zm1.48-15.28c-.96 0-1.76-.78-1.76-1.76s.79-1.76 1.76-1.76c.97 0 1.76.78 1.76 1.76s-.79 1.76-1.76 1.76zm-2.1 15.28h2.96v-6.14c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.59-2.34 3.23v6.25H1.3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- No Profile Found Message -->
        <div v-else class="text-center text-gray-400 z-10">
          <p class="text-lg">No profile found</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const student = ref(null);
  
  onMounted(async () => {
    try {
      const email = 'isha.mahajan@example.com'; // Replace with dynamic method if needed
      const response = await axios.get(`http://localhost:3000/api/ethereum/get-profile-by-email/${email}`);
      if (response.status === 200 && response.data.student) {
        student.value = response.data.student;
      } else {
        student.value = null;
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      student.value = null;
    }
  });
  </script>
  
  <style scoped>
  /* Add any additional styles here if needed */
  </style>
  
<template>
    <div class="relative min-h-screen bg-gray-900 text-gray-100">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img class="w-full h-64 object-cover opacity-30" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Background Image">
      </div>
      
      <div class="relative p-6 flex flex-col items-center justify-center min-h-screen">
        <!-- Profile Card -->
        <div v-if="student" class="bg-gray-800 text-white shadow-lg rounded-lg p-6 max-w-4xl w-full z-10 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <div class="flex flex-col md:flex-row items-center">
            <!-- Profile Picture -->
            <div class="flex-shrink-0 mb-6 md:mb-0 md:mr-6 relative group">
              <img :src="student.profilePicture || 'https://via.placeholder.com/150'" alt="Profile Picture" class="w-32 h-32 rounded-full border-4 border-blue-600"/>
              <!-- Hover effect -->
              <div class="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full"></div>
            </div>
            <!-- Profile Details -->
            <div class="flex-1">
              <h1 class="text-4xl font-bold mb-2 transition-transform transform hover:scale-105 duration-300">{{ student.name }}</h1>
              <p class="text-lg mb-2"><strong>Student ID:</strong> {{ student.prn }}</p>
              <p class="text-lg mb-2"><strong>Course:</strong> {{ student.department }}</p>
              <p class="text-lg mb-2"><strong>Phone:</strong> {{ student.phone }}</p>
              <p class="text-lg mb-2"><strong>Email:</strong> {{ student.email }}</p>
              <p class="text-lg mb-2"><strong>Institution:</strong> {{ student.institution }}</p>
              <p class="text-lg mb-2"><strong>Enrollment Date:</strong> {{ student.enrollmentDate }}</p>
              
              <!-- User Statistics -->
              <div class="mt-6 border-t border-gray-700 pt-4">
                <h2 class="text-xl font-semibold mb-2">Academic Statistics</h2>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                    <h3 class="text-lg font-semibold">Completed Courses</h3>
                    <p class="text-xl">{{ student.completedCourses }}</p>
                  </div>
                  <div class="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                    <h3 class="text-lg font-semibold">Current GPA</h3>
                    <p class="text-xl">{{ student.gpa }}</p>
                  </div>
                  <div class="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                    <h3 class="text-lg font-semibold">Pending Assignments</h3>
                    <p class="text-xl">{{ student.pendingAssignments }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Recent Activity -->
              <div class="mt-6 border-t border-gray-700 pt-4">
                <h2 class="text-xl font-semibold mb-2">Recent Activities</h2>
                <ul>
                  <li class="bg-gray-700 p-3 rounded-lg mb-2 transition-transform transform hover:scale-105 duration-300">
                    <p class="font-semibold">Submitted assignment</p>
                    <p class="text-gray-400 text-sm">Just now</p>
                  </li>
                  <li class="bg-gray-700 p-3 rounded-lg mb-2 transition-transform transform hover:scale-105 duration-300">
                    <p class="font-semibold">Completed quiz</p>
                    <p class="text-gray-400 text-sm">2 hours ago</p>
                  </li>
                </ul>
              </div>
  
              <!-- Social Media Links -->
              <div class="mt-6 border-t border-gray-700 pt-4">
                <h2 class="text-xl font-semibold mb-2">Connect with me</h2>
                <div class="flex space-x-4">
                    <!-- Twitter Icon -->
                    <a href="https://twitter.com/yourprofile" target="_blank" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                      <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.949.56-2.002.97-3.127 1.188-.896-.952-2.173-1.548-3.591-1.548-2.713 0-4.915 2.202-4.915 4.917 0 .39.044.765.128 1.124-4.083-.205-7.702-2.16-10.126-5.134-.423.724-.666 1.561-.666 2.457 0 1.697.863 3.191 2.175 4.067-.802-.026-1.556-.246-2.217-.616v.062c0 2.366 1.684 4.342 3.918 4.785-.41.111-.842.171-1.287.171-.315 0-.623-.03-.922-.086.623 1.943 2.432 3.357 4.576 3.397-1.676 1.311-3.786 2.092-6.081 2.092-.395 0-.787-.023-1.174-.068 2.173 1.394 4.75 2.209 7.548 2.209 9.057 0 14.01-7.496 14.01-13.986 0-.21 0-.423-.015-.633.961-.695 1.8-1.56 2.465-2.548l-.047-.02z"/>
                      </svg>
                    </a>
                    
                    <!-- GitHub Icon -->
                    <a href="https://github.com/yourprofile" target="_blank" class="text-gray-400 hover:text-gray-300 transition-colors duration-300">
                      <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.304 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.304 3.495.998.108-.775.418-1.304.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.382 1.236-3.221-.124-.304-.536-1.527.117-3.176 0 0 1.01-.322 3.3 1.23.957-.266 1.983-.398 3.005-.404 1.02.006 2.048.138 3.006.404 2.287-1.552 3.295-1.23 3.295-1.23.655 1.649.243 2.872.12 3.176.77.839 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.815 1.104.815 2.229 0 1.609-.014 2.908-.014 3.307 0 .323.215.694.825.576 4.765-1.588 8.2-6.084 8.2-11.384 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    
                    <!-- LinkedIn Icon -->
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" class="text-blue-700 hover:text-blue-800 transition-colors duration-300">
                      <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.616 3h-15.232c-1.402 0-2.384.982-2.384 2.383v15.233c0 1.402.982 2.384 2.384 2.384h15.232c1.401 0 2.384-.982 2.384-2.384v-15.232c0-1.401-.983-2.384-2.384-2.384zm-11.616 18h-3v-9h3v9zm-1.5-10.199c-.966 0-1.75-.785-1.75-1.75s.784-1.751 1.75-1.751c.965 0 1.75.786 1.75 1.751s-.785 1.75-1.75 1.75zm11.5 10.199h-3v-4.503c0-1.075-.02-2.46-1.5-2.46-1.503 0-1.733 1.172-1.733 2.381v4.582h-3v-9h2.883v1.231h.042c.402-.761 1.384-1.56 2.847-1.56 3.045 0 3.607 2.003 3.607 4.608v4.721z"/>
                      </svg>
                    </a>
                  </div>
                  
              </div>
  
              <!-- Centered Plus Button -->
              <div class="flex justify-center ">
                <div @click="updateStudent(student)" class="mt-8">
                    <button class="px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 duration-300 flex items-center justify-center">
                      Update
                      <svg class="w-6 h-6 ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  import { useRouter } from 'vue-router';
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
  
  const router = useRouter();
  
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
  </script>
  
  <style scoped>
  /* Add any additional styles here if needed */
  </style>
  
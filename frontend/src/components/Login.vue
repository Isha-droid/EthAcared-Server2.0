<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 text-white w-full">
    <div class="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-8 text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-6">
          <label for="email" class="block text-sm mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        console.log('Login successful:', response.data);

        // Store token in local storage (optional)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.user.role);
        localStorage.setItem('username', response.data.user.username);


        // localStorage.setItem('user', response.data.user);


        // Redirect or perform other actions based on the response
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        alert('Login failed. Please check your credentials and try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles to enhance the form */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Poppins', sans-serif;
}

.bg-gray-900 {
  background-color: #1a202c; /* Darker gray for full screen effect */
}

.bg-gray-800 {
  background-color: #2d3748; /* Slightly lighter gray for contrast */
}

.bg-gray-700 {
  background-color: #4a5568; /* Input field color */
}

.max-w-lg {
  max-width: 28rem; /* Ensure form isn't too wide on larger screens */
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #edf2f7; /* White color with slight tint for header */
}

input {
  padding: 0.75rem;
  font-size: 1rem;
}

button {
  background-color: #3182ce;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

button:hover {
  background-color: #2b6cb0;
}

@media (min-width: 1024px) {
  /* Adjustments for laptop screens */
  .max-w-lg {
    max-width: 36rem; /* Slightly wider on laptops */
  }
  
  input {
    padding: 1rem;
  }

  button {
    padding: 1rem;
  }
}
</style>

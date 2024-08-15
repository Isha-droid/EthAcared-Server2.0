// useFetchStudents.js
import { ref } from 'vue';
import axios from 'axios';

export function useFetchStudents() {
  const students = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/ethereum/view-all-students');
      students.value = response.data.studentList;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  fetchStudents();

  return { students, loading, error };
}

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HelloWorld.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CreateStudent from '../components/CreateStudent.vue';
import UpdateStudent from '../components/UpdateStudent.vue';
import DeleteStudent from '../components/DeleteStudent.vue';
import ProfileMenu from '../components/ProfileMenu.vue';
import Dashboard from '../components/Dashboard.vue';
import ViewStudents from '../components/ViewStudents.vue';
import DepartmentStudents from '../components/DepartmentStudents.vue';
import ViewProfile from '../components/ViewProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/create-student', component: CreateStudent },
  { path: '/update-student/:studentId?', name: 'update-student', component: UpdateStudent, props: route => ({ student: JSON.parse(route.query.student || '{}') }) },
  { path: '/delete-student', component: DeleteStudent },
  { path: '/delete-student/:prn', name: 'delete-student', component: DeleteStudent, props: true },
  { path: '/view-all-students', component: ViewStudents },
  { path: '/profile', component: ProfileMenu },
  { path: '/dashboard', component: Dashboard },
  { path: '/department-students', component: DepartmentStudents },
  { path: '/view-profile', component: ViewProfile },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import HomeView from '@/views/HomeView.vue';
import Course from '@/views/CourseView.vue';
import PageNotFound from '@/views/PageNotFoundView.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:id',
    name: 'course',
    component: Course,
  },
  { path: '/404', component: PageNotFound },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
];
import HomeView from '@/features/home/view/HomeView.vue';
import Course from '@/features/course/view/CourseView.vue';
import PageNotFound from '@/features/page-not-found/view/PageNotFoundView.vue';

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
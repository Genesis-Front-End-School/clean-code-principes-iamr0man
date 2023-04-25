import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Course from '@/views/CourseView.vue';
import PageNotFound from '@/views/PageNotFoundView.vue';
import { getLocalAccessToken, setLocalAccessToken } from '@/api/localStorage';
import { api } from '@/api/api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

router.beforeEach(async (to, from, next) => {
  const loggedIn = getLocalAccessToken();

  if (!loggedIn) {
    const data = await api.signIn();

    if (data.isSuccess) {
      setLocalAccessToken(data.response.token);
    }
  }
  next();
});

export default router;

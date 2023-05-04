import { createRouter, createWebHistory } from 'vue-router';
import { getLocalAccessToken, setLocalAccessToken } from '@/api/localStorage';
import { api } from '@/api/api';
import { routes } from '@/router/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
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

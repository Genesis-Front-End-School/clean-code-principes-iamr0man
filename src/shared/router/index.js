import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/shared/router/routes';
import { authGateway } from '@/shared/gateway/auth.gateway';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  await authGateway.initToken();
  next();
});

export default router;

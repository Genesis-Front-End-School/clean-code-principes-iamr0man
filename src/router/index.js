import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';
import { authGateway } from '@/gateway/auth.gateway';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  await authGateway.initToken();
  next();
});

export default router;

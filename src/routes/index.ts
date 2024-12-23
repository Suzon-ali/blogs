import { Router } from 'express';
import { BlogRoutes } from '../app/modules/blog/blog.route';
import { AuthRoutes } from '../app/modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

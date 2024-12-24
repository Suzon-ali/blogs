import { Router } from 'express';
import { BlogRoutes } from '../app/modules/blog/blog.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { AuthRoutes } from '../app/modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
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

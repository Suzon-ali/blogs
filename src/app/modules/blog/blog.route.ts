import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { blogValidationSchemas } from './blog.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchemas.blogValidationSchema),
  BlogControllers.createBlog,
);
router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;

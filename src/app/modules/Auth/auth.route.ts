import express from 'express';
import { AuthContollers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchemas } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidationSchemas.loginValidationSchema),
  AuthContollers.loginUser,
);

export const AuthRoutes = router;

import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

export const AuthValidationSchemas = {
  loginValidationSchema,
};

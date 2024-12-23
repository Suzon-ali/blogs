import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'User is required!' }),
    email: z
      .string({ required_error: 'User is required!' })
      .email({ message: 'Invalid email format!' }),
    password: z
      .string({ required_error: 'User is required!' })
      .min(4, { message: 'Password is less than 6 charecters' })
      .max(18, { message: 'Password should be less than 18 Charecters' }),
    isBlocked: z.boolean().default(false),
    role: z
      .enum(['admin', 'user'], { required_error: 'Role is required' })
      .default('user'),
  }),
});

const userUpdateValidationSchema = z.object({
  body: userValidationSchema.partial(),
});

export const userValidationSchemas = {
  userValidationSchema,
  userUpdateValidationSchema,
};

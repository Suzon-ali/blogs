import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is requierd!' })
      .min(10, { message: 'Min 10 Charecters' }),
    content: z
      .string({ required_error: 'Content is requierd!' })
      .min(50, { message: 'Min 50 Charecters' }),
    author: z
      .string({
        required_error: 'Author is requierd!',
        invalid_type_error: 'Author must need to be string',
      })
      .min(10, { message: 'Min 2 Charecters' })
      .optional(),
    isPublished: z.boolean({ invalid_type_error: 'Invalid type' }).optional(),
    isDeleted: z.boolean({ invalid_type_error: 'Invalid type' }).optional(),
  }),
});

const blogUpdateValidationSchema = z.object({
  body: blogValidationSchema.partial(),
});

export const blogValidationSchemas = {
  blogValidationSchema,
  blogUpdateValidationSchema,
};

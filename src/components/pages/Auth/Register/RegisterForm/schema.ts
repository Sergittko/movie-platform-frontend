import { z } from 'zod';

import { lettersAndSpacesRegex } from '@/constants/regex';
import { emailConstants, nameConstants, passwordConstants } from '@/constants/schema-constants';

export const registerSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(emailConstants.minLength, { message: 'Email is required' })
      .max(emailConstants.maxLength, { message: 'Email is too long' })
      .trim(),
    password: z
      .string()
      .min(passwordConstants.minLength, { message: 'Password must be at least 8 characters long' })
      .max(passwordConstants.maxLength, { message: 'Password is too long' })
      .trim(),
    confirmPassword: z
      .string()
      .min(passwordConstants.minLength, {
        message: 'Confirm password must be at least 8 characters long',
      })
      .max(passwordConstants.minLength, { message: 'Confirm password is too long' })
      .trim(),
    name: z
      .string()
      .min(nameConstants.minLength, { message: 'Name is required' })
      .max(nameConstants.maxLength, { message: 'Name is too long' })
      .regex(lettersAndSpacesRegex, {
        message: 'Name must be only letters',
      })
      .trim(),
    avatar: z.instanceof(File).or(z.undefined()).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
export type RegisterValuesSchemaType = z.infer<typeof registerSchema>;

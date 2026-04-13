import { z } from 'zod';

import { logInSchema } from '@/components/pages/Auth/Login/LoginForm/schema';
import { registerSchema } from '@/components/pages/Auth/Register/RegisterForm/schema';
import { UserType } from '@/redux/user/userTypes';
import { IResponse } from '@/types/http';

export type RegisterData = z.infer<typeof registerSchema>;

export type LogInData = z.infer<typeof logInSchema>;

export type ResetPasswordData = {
  oldPassword: string;
  newPassword: string;
};

export interface IAuthResponse extends IResponse<{
  user: Pick<UserType, 'id' | 'email'>;
  access_token: string;
  refresh_token: string;
  // eslint-disable-next-line prettier/prettier
}> {}

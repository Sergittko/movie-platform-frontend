'use client';

import { AppRoutePathEnum } from '@/types/routes';

import AuthWrapperCard from '../AuthWrapperCard';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <AuthWrapperCard
      title="Login"
      subtitle="Enter your credentials to access your account"
      footerText="Don't have an account?"
      linkTo={AppRoutePathEnum.REGISTER}
      linkText="Register"
    >
      <LoginForm />
    </AuthWrapperCard>
  );
};

export default Login;

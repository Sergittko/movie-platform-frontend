'use client';

import { AppRoutePathEnum } from '@/types/routes';

import AuthWrapperCard from '../AuthWrapperCard';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <AuthWrapperCard
      title="Create account"
      subtitle="Register to start using full platform functionality"
      footerText="Already have an account?"
      linkTo={AppRoutePathEnum.LOGIN}
      linkText="Login"
    >
      <RegisterForm />
    </AuthWrapperCard>
  );
};

export default Register;

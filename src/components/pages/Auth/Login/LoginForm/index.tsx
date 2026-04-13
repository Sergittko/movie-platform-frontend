'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { authApi } from '@/api/auth/authApi';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { errorToast, successToast } from '@/helpers/toastActions';
import { setLoginData } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { setUserLoginData } from '@/redux/user/userSlice';

import DefaultInput from '../../ui/DefaultInput';
import PasswordInput from '../../ui/PasswordInput';
import { logInSchema, LoginValuesSchemaType } from './schema';

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm<LoginValuesSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (values: LoginValuesSchemaType) => authApi.login(values),
    mutationKey: ['login'],
    onSuccess: (response) => {
      if (response?.data) {
        dispatch(setLoginData(response.data));
        dispatch(setUserLoginData(response.data));
        successToast('Successful log in');
      }
    },
    onError: () => {
      errorToast('Error while log in');
    },
  });

  const onSubmit = (values: LoginValuesSchemaType) => {
    loginMutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DefaultInput
          name="email"
          control={form.control}
          label="Email"
          placeholder="example@email.com"
        />
        <PasswordInput control={form.control} name="password" label="Password" />

        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={!form.formState.isValid || isPending}
        >
          Log in
          {isPending && <Spinner className="relative top-px" />}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

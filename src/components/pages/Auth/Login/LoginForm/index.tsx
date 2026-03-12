'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import DefaultInput from '../../ui/DefaultInput';
import PasswordInput from '../../ui/PasswordInput';
import { logInSchema, LoginValuesSchemaType } from './schema';

const LoginForm = () => {
  const form = useForm<LoginValuesSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginValuesSchemaType) => {
    // eslint-disable-next-line no-console
    console.log(values);
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

        <Button type="submit" className="mt-4 w-full" disabled={!form.formState.isValid}>
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Path, useForm } from 'react-hook-form';

import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import AvatarInput from '../../ui/AvatarInput';
import DefaultInput from '../../ui/DefaultInput';
import PasswordInput from '../../ui/PasswordInput';
import { registerSchema, RegisterValuesSchemaType } from './schema';

const RegisterForm = () => {
  const form = useForm<RegisterValuesSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined,
    },
  });

  const onSubmit = (data: RegisterValuesSchemaType) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <RowContainer className="items-center">
          <AvatarInput
            setFormValue={(name, file) =>
              form.setValue(name as Path<RegisterValuesSchemaType>, file)
            }
          />

          <ColContainer className="w-full gap-4">
            <DefaultInput name="name" control={form.control} label="Name" placeholder="Your name" />
            <DefaultInput
              name="email"
              control={form.control}
              label="Email"
              placeholder="example@email.com"
            />
          </ColContainer>
        </RowContainer>

        <RowContainer className="gap-4">
          <PasswordInput control={form.control} name="password" label="Password" />
          <PasswordInput control={form.control} name="confirmPassword" label="Confirm password" />
        </RowContainer>

        <Button type="submit" className="mt-4 w-full" disabled={!form.formState.isValid}>
          Create account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

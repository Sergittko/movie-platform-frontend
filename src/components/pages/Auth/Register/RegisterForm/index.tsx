'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Path, useForm, useWatch } from 'react-hook-form';

import { authApi } from '@/api/auth/authApi';
import { usersApi } from '@/api/users/usersApi';
import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { errorToast, successToast } from '@/helpers/toastActions';
import { setLoginData } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { setUserLoginData, setUserPartialData } from '@/redux/user/userSlice';

import AvatarInput from '../../ui/AvatarInput';
import DefaultInput from '../../ui/DefaultInput';
import PasswordInput from '../../ui/PasswordInput';
import { registerSchema, RegisterValuesSchemaType } from './schema';

const RegisterForm = () => {
  const dispatch = useAppDispatch();

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

  const avatar = useWatch({
    control: form.control,
    name: 'avatar',
  });

  const { mutate: uploadAvatarRequest } = useMutation({
    mutationFn: (data: { file: File; userId: string }) => usersApi.uploadAvatar(data),
    mutationKey: ['uploadAvatar'],
    onSuccess: (response) => {
      if (response.data.data.avatarUrl) {
        dispatch(setUserPartialData({ avatar: response.data.data.avatarUrl }));
      }
    },
  });

  const { mutate: registerMutate, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: ({ avatar, ...values }: RegisterValuesSchemaType) => authApi.register(values),
    mutationKey: ['register'],
    onSuccess: (response) => {
      if (response?.data) {
        if (avatar) uploadAvatarRequest({ file: avatar, userId: response.data.data.user.id });
        dispatch(setLoginData(response.data));
        dispatch(setUserLoginData(response.data));
        successToast('Registration successfully passed');
      }
    },
    onError: () => {
      errorToast('Error while creating account');
    },
  });

  const onSubmit = (values: RegisterValuesSchemaType) => {
    registerMutate(values);
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
          {isPending && <Spinner className="relative top-px" />}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

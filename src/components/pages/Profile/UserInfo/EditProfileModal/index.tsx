'use client';

import { useMutation } from '@tanstack/react-query';
import { Edit, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { usersApi } from '@/api/users/usersApi';
import UserAvatar from '@/components/basic/UserAvatar';
import DefaultInput from '@/components/pages/Auth/ui/DefaultInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { errorToast, successToast } from '@/helpers/toastActions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { setUserData, setUserPartialData } from '@/redux/user/userSlice';

interface IEditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type EditProfileFormType = {
  name: string;
};

const EditProfileModal = ({ open, onOpenChange }: IEditProfileModalProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userSelectors.getUserData);

  const [tempAvatar, setTempAvatar] = useState<File | null>(null);

  const form = useForm<EditProfileFormType>({
    defaultValues: {
      name: userData.name || '',
    },
  });

  const name = useWatch({ control: form.control, name: 'name', defaultValue: userData.name || '' });

  const isFormChanged = name !== userData.name || tempAvatar !== null;

  const handleClose = () => {
    onOpenChange(false);
    setTempAvatar(null);
    form.reset();
  };

  const { mutate: uploadAvatarRequest, isPending: uploadAvatarIsFetching } = useMutation({
    mutationFn: (data: { file: File; userId: string }) => usersApi.uploadAvatar(data),
    mutationKey: ['uploadAvatar'],
    onSuccess: (response) => {
      if (response.data.data.avatarUrl) {
        dispatch(setUserPartialData({ avatar: response.data.data.avatarUrl }));
        handleClose();
      }
    },
  });

  const { mutate: updateProfileMutate, isPending: updateProfileIsFetching } = useMutation({
    mutationFn: ({ data, userId }: { data: Partial<EditProfileFormType>; userId: string }) =>
      usersApi.updateProfileById({
        updateProfileData: data,
        userId,
      }),
    mutationKey: ['editProfile'],
    onSuccess: (response) => {
      if (response?.data) {
        dispatch(setUserData(response.data.data.profile));
        successToast('Profile successfully updated');
        handleClose();
      }
    },
    onError: () => {
      errorToast('Error while updating profile');
    },
  });

  const isSubmitDisabled =
    !isFormChanged || name.length < 3 || uploadAvatarIsFetching || updateProfileIsFetching;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];

      setTempAvatar(selectedFile);
    }
  };

  const handleSubmit = (data: EditProfileFormType) => {
    if (!isFormChanged) return;

    updateProfileMutate({ data, userId: userData.id });

    if (tempAvatar) {
      uploadAvatarRequest({
        file: tempAvatar,
        userId: userData.id,
      });
    }
  };

  useEffect(() => {
    if (open) {
      form.reset({
        name: userData.name || '',
      });

      setTempAvatar(null);
    }

    if (!open) {
      setTempAvatar(null);

      form.reset({
        name: userData.name || '',
      });
    }
  }, [open, userData.name, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-white/20 p-6 backdrop-blur-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/10">
              <Edit className="size-4 text-white/70" />
            </div>

            <DialogTitle>Edit Profile</DialogTitle>
          </div>

          <DialogDescription className="flex items-center gap-1.5">
            <span>Update your profile information.</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="flex items-center gap-6">
              <label aria-disabled={uploadAvatarIsFetching}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  disabled={uploadAvatarIsFetching}
                />

                <UserAvatar
                  tempAvatar={tempAvatar ? URL.createObjectURL(tempAvatar) : null}
                  className="h-21! w-21!"
                />
              </label>

              <div className="flex-1">
                <DefaultInput
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  control={form.control}
                  containerClassName="flex-1"
                  isDisabled={uploadAvatarIsFetching || updateProfileIsFetching}
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="submit" disabled={isSubmitDisabled} className="w-full rounded-4xl">
                {uploadAvatarIsFetching || updateProfileIsFetching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Save changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;

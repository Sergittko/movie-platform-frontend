import { UserType } from '@/redux/user/userTypes';
import { IResponse } from '@/types/http';

export interface IGetUserByIdResponse extends IResponse<{
  profile: UserType;
  // eslint-disable-next-line prettier/prettier
}> {}

export interface IUpdateProfileResponse extends IResponse<{
  profile: UserType;
  // eslint-disable-next-line prettier/prettier
}> {}

export interface IUpdateProfileData {
  updateProfileData: {
    email?: string;
    oldPassword?: string;
    newPassword?: string;
    name?: string;
  };
  userId: string;
}

export interface IUploadAvatarResponse extends IResponse<{
  avatarUrl: string;
}> {
  message: string;
}

import { UserType } from '@/redux/user/userTypes';
import { IPaginationData, IResponse, IResponsePagination } from '@/types/http';
import { ISavedUserMovie } from '@/types/movies';

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

export interface ICreateMovieDto {
  movieId: string;
  title: string;
  image: string;
}

export interface IUpdateMovieDto {
  title?: string;
  image?: string;
}

export interface IUserMoviesResponse extends IResponsePagination<{
  movies: ISavedUserMovie[];
  // eslint-disable-next-line prettier/prettier
}> {}

export interface IUserMovieResponse extends IResponsePagination<{
  movie: ISavedUserMovie;
  // eslint-disable-next-line prettier/prettier
}> {}

export interface IUserMovieIdsResponse extends IResponse<{
  movieIds: string[];
  // eslint-disable-next-line prettier/prettier
}> {}

export interface IMessageResponse {
  message: string;
}

export type GetMoviesListDataType = { userId: string } & IPaginationData;

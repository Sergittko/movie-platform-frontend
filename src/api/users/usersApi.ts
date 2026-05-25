import axios from 'axios';

import {
  GetMoviesListDataType,
  ICreateMovieDto,
  IGetUserByIdResponse,
  IMessageResponse,
  IUpdateMovieDto,
  IUpdateProfileData,
  IUpdateProfileResponse,
  IUploadAvatarResponse,
  IUserMovieIdsResponse,
  IUserMovieResponse,
  IUserMoviesResponse,
} from '@/api/users/usersTypes';
import environment from '@/config';
import store from '@/redux/store';

const instance = axios.create({
  baseURL: `${environment.BASE_URL}/users/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const usersApi = {
  getUserById(userId: string) {
    return instance.get<IGetUserByIdResponse>(`${userId}`);
  },

  updateProfileById({ userId, updateProfileData }: IUpdateProfileData) {
    return instance.patch<IUpdateProfileResponse>(`${userId}`, updateProfileData);
  },

  uploadAvatar({ file, userId }: { file: File; userId: string }) {
    const formData = new FormData();
    formData.append('file', file);

    return instance.post<IUploadAvatarResponse>(`${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteAvatar({ userId }: { userId: string }) {
    return instance.delete<IUploadAvatarResponse>(`${userId}/avatar`);
  },

  getWatchlist(data: GetMoviesListDataType) {
    const { userId, ...params } = data;
    return instance.get<IUserMoviesResponse>(`${userId}/watchlist`, { params });
  },

  addToWatchlist({ userId, movieData }: { userId: string; movieData: ICreateMovieDto }) {
    return instance.post<IUserMovieResponse>(`${userId}/watchlist`, movieData);
  },

  updateWatchlistMovie({
    userId,
    movieId,
    movieData,
  }: {
    userId: string;
    movieId: string;
    movieData: IUpdateMovieDto;
  }) {
    return instance.patch<IUserMovieResponse>(`${userId}/watchlist/${movieId}`, movieData);
  },

  deleteWatchlistMovie({ userId, movieId }: { userId: string; movieId: string }) {
    return instance.delete<IMessageResponse>(`${userId}/watchlist/${movieId}`);
  },

  getWatchlistMovieIds(userId: string) {
    return instance.get<IUserMovieIdsResponse>(`${userId}/watchlist/movie-ids`);
  },

  getWatchedMovies(data: GetMoviesListDataType) {
    const { userId, ...params } = data;
    return instance.get<IUserMoviesResponse>(`${userId}/watched`, { params });
  },

  addToWatched({ userId, movieData }: { userId: string; movieData: ICreateMovieDto }) {
    return instance.post<IUserMovieResponse>(`${userId}/watched`, movieData);
  },

  updateWatchedMovie({
    userId,
    movieId,
    movieData,
  }: {
    userId: string;
    movieId: string;
    movieData: IUpdateMovieDto;
  }) {
    return instance.patch<IUserMovieResponse>(`${userId}/watched/${movieId}`, movieData);
  },

  deleteWatchedMovie({ userId, movieId }: { userId: string; movieId: string }) {
    return instance.delete<IMessageResponse>(`${userId}/watched/${movieId}`);
  },

  getWatchedMovieIds(userId: string) {
    return instance.get<IUserMovieIdsResponse>(`${userId}/watched/movie-ids`);
  },
};

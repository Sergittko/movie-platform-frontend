import axios from 'axios';

import environment from '@/config';
import store from '@/redux/store';

import { IAuthResponse, LogInData, RegisterData } from './authTypes';

const instance = axios.create({
  baseURL: `${environment.BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const excludedTokenAuthPaths = ['/signUp', '/signIn'];

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    const isExcluded = excludedTokenAuthPaths.some((path) => config.url?.includes(path));

    if (token && !isExcluded) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const authApi = {
  register(data: RegisterData) {
    return instance.post<IAuthResponse>(`signUp`, data);
  },

  login(data: LogInData) {
    return instance.post<IAuthResponse>(`signIn`, data);
  },

  refresh(refresh_token: string) {
    return instance.post<IAuthResponse>(`refresh`, { refresh_token });
  },
};

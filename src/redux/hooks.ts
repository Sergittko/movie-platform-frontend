'use client';

import { useRouter } from 'next/navigation';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { successToast } from '@/helpers/toastActions';
import authSelectors from '@/redux/auth/authSelectors';
import type { AppDispatch, RootState } from '@/redux/store';
import { AppRoutePathEnum } from '@/types/routes';

import { logout } from './auth/authSlice';
import { userLogout } from './user/userSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = (): boolean => {
  const refreshToken = useAppSelector(authSelectors.getRefreshToken);
  const accessToken = useAppSelector(authSelectors.getAccessToken);
  const isAuthenticated = !!(refreshToken && accessToken);

  return isAuthenticated;
};

export const useLogOut = (): (() => void) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(userLogout());

    successToast('Log out successful');

    router.push(AppRoutePathEnum.HOME);
  };

  return handleLogOut;
};

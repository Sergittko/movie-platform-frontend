import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// types
import { IAuthResponse } from '@/api/auth/authTypes';
import { AuthState } from '@/redux/auth/authTypes';

const initialState = {
  accessToken: '',
  refreshToken: '',
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<IAuthResponse>) => {
      const accessToken = action.payload.data.access_token;
      const refreshToken = action.payload.data.refresh_token;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      Cookies.set('accessToken', accessToken, {
        expires: 7,
        sameSite: 'lax',
      });

      Cookies.set('refreshToken', refreshToken, {
        expires: 30,
        sameSite: 'lax',
      });
    },
    logout: (state) => {
      Object.assign(state, initialState);

      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
});

export const { setLoginData, logout } = authSlice.actions;
export default authSlice.reducer;

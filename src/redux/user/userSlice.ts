import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthResponse } from '@/api/auth/authTypes';
import { UserType } from '@/redux/user/userTypes';

const initialState = {
  id: '',
  email: '',
  name: '',
  avatar: null,
} as UserType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      const { id, ...restProfileData } = action.payload;
      return { ...state, ...restProfileData };
    },
    setUserPartialData: (state, action: PayloadAction<Partial<UserType>>) => {
      return { ...state, ...action.payload };
    },
    setUserLoginData: (state, action: PayloadAction<IAuthResponse>) => {
      state.id = action.payload.data.user.id;
      state.email = action.payload.data.user.email;
    },
    userLogout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserData, setUserLoginData, userLogout, setUserPartialData } = userSlice.actions;

export default userSlice.reducer;

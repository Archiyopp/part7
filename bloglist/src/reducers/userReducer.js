import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/users';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    token: '',
    users: [],
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
    initUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, removeUser, initUsers } = usersSlice.actions;

export const initializeUsers = () => async (dispatch) => {
  const users = await getAllUsers();
  dispatch(initUsers(users));
};

export const selectUser = (state) => state.users.user;

export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

let timeout;

export const notificationSlice = createSlice({
  name: 'notis',
  initialState: {
    notification: '',
    success: true,
  },
  reducers: {
    success: (state, action) => {
      state.success = true;
      state.notification = action.payload;
    },
    failure: (state, action) => {
      state.success = false;
      state.notification = action.payload;
    },
    empty: (state) => {
      state.notification = '';
    },
  },
});

const { success, failure, empty } = notificationSlice.actions;

export const asyncSuccess = (notification) => (dispatch) => {
  clearTimeout(timeout);
  dispatch(success(notification));
  timeout = setTimeout(() => {
    dispatch(empty());
  }, 4000);
};

export const asyncFailure = (notification) => (dispatch) => {
  clearTimeout(timeout);
  dispatch(failure(notification));
  timeout = setTimeout(() => {
    dispatch(empty());
  }, 4000);
};

export const selectNotis = (state) => state.notis;

export default notificationSlice.reducer;

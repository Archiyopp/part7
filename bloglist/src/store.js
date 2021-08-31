import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    notis: notificationReducer,
    blogList: blogsReducer,
    users: usersReducer,
  },
});

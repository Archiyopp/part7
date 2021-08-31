import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    notis: notificationReducer,
    blogList: blogsReducer,
    user: userReducer,
  },
});

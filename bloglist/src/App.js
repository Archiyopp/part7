import React, { useState, useEffect } from 'react';
import AddBlog from './components/addBlog';
import LoginForm from './components/loginForm';
import { setToken } from './services/blogs';
import {
  asyncSuccess,
  asyncFailure,
  selectNotis,
} from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddBlog,
  initializeBlogs,
} from './reducers/blogsReducer';
import {
  selectUser,
  setUser,
  removeUser,
} from './reducers/userReducer';
import Blogs from './components/Blogs';

const App = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useDispatch();
  const { notification, success } = useSelector(selectNotis);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUser =
      window.localStorage.getItem('loggedBlogAppUser') || null;
    if (loggedInUser) {
      const loggedUser = JSON.parse(loggedInUser);
      dispatch(setUser(loggedUser));
      setToken(loggedUser.token);
    }
  }, []);

  const createBlog = async (newObject) => {
    try {
      dispatch(asyncAddBlog(newObject));
      dispatch(
        asyncSuccess(
          `A new blog ${newObject.title} by ${newObject.author} added`
        )
      );
    } catch (e) {
      dispatch(asyncFailure(e.message));
    }
  };

  return (
    <div className="container">
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <h2>blogs</h2>
          {notification && (
            <p className={`${success ? 'notification' : 'error'}`}>
              {notification}
            </p>
          )}
          <p>
            {user.name} logged-in{' '}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogAppUser');
                dispatch(removeUser());
              }}
              className="btn"
              id="logout"
            >
              Log out
            </button>
          </p>
          {showCreateForm ? (
            <AddBlog
              hideCreateForm={() => setShowCreateForm(false)}
              createBlog={createBlog}
            />
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn"
              id="show-create-blog"
            >
              Create new blog
            </button>
          )}
          <Blogs />
        </>
      )}
    </div>
  );
};

export default App;

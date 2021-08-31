import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBlog from '../components/addBlog';
import Blogs from '../components/Blogs';
import LoginForm from '../components/loginForm';
import {
  asyncAddBlog,
  initializeBlogs,
} from '../reducers/blogsReducer';
import {
  asyncFailure,
  asyncSuccess,
} from '../reducers/notificationReducer';
import { selectUser } from '../reducers/userReducer';

function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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

  const createFormOrButton = showCreateForm ? (
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
  );
  return (
    <>
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <h2>blogs</h2>
          {createFormOrButton}
          <Blogs />
        </>
      )}
    </>
  );
}

export default Home;

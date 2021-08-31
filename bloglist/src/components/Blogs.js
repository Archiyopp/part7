import { useSelector } from 'react-redux';
import { selectBlogs } from '../reducers/blogsReducer';
import {} from '../reducers/notificationReducer';
import Blog from './Blog';
import React from 'react';

const Blogs = () => {
  const blogs = useSelector(selectBlogs);

  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
    </>
  );
};

export default Blogs;

import { useDispatch, useSelector } from 'react-redux';
import {
  asyncLikeBlog,
  asyncRemoveBlog,
  selectBlogs,
} from '../reducers/blogsReducer';
import {
  asyncFailure,
  asyncSuccess,
} from '../reducers/notificationReducer';
import Blog from './Blog';
import React from 'react';
import { selectUser } from '../reducers/userReducer';

const Blogs = () => {
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          const {
            title,
            author,
            likes,
            url,
            user: blogUser,
            id,
          } = blog;

          const deleteBlog = async () => {
            const confirm = window.confirm(
              'Are you sure you want to delete this post?'
            );
            if (confirm) {
              if (user.username === blogUser.username) {
                try {
                  dispatch(asyncRemoveBlog(id));
                  dispatch(asyncSuccess('Successfully removed blog'));
                } catch (e) {
                  console.error(e.message);
                }
              } else {
                dispatch(
                  asyncFailure('You are not the owner of the blog')
                );
              }
            }
          };

          const likeBlog = async () => {
            const newBlog = {
              title,
              author,
              likes: likes + 1,
              url,
              user: blogUser.id,
            };
            try {
              dispatch(asyncLikeBlog(id, newBlog));
            } catch (e) {
              console.error(e.message);
            }
          };
          return (
            <Blog
              key={id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
            />
          );
        })}
    </>
  );
};

export default Blogs;

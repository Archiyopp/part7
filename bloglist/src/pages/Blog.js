import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncLikeBlog,
  asyncRemoveBlog,
  selectBlogs,
} from '../reducers/blogsReducer';
import {
  asyncFailure,
  asyncSuccess,
} from '../reducers/notificationReducer';
import { selectUser } from '../reducers/userReducer';

export default function Blog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  if (blogs.length === 0) {
    return null;
  }
  const user = useSelector(selectUser);
  const blog = blogs.find((blog) => blog.id === id);
  const { title, author, url, likes, user: blogUser } = blog;
  console.log(blog);
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
        dispatch(asyncFailure('You are not the owner of the blog'));
      }
    }
  };
  return (
    <div className="blog">
      <h2>{title}</h2>
      <p>{url}</p>
      <p>
        likes {likes}{' '}
        <button className="btn like-btn" onClick={likeBlog}>
          like
        </button>
      </p>
      <p>added by {author}</p>
      <button onClick={deleteBlog} className="btn" id="remove-btn">
        remove
      </button>
    </div>
  );
}

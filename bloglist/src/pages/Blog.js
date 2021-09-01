import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncLikeBlog,
  asyncRemoveBlog,
  commentBlog,
  selectBlogs,
} from '../reducers/blogsReducer';
import {
  asyncFailure,
  asyncSuccess,
} from '../reducers/notificationReducer';
import { selectUser } from '../reducers/userReducer';

export default function Blog() {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  if (blogs.length === 0) {
    return null;
  }
  const user = useSelector(selectUser);

  const blog = blogs.find((blog) => blog.id === id);
  const { title, author, url, likes, user: blogUser } = blog;

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

  const addComment = async () => {
    let comments = blog.comments || [];
    comments = [...comments, comment];
    dispatch(commentBlog(id, comments));
    setComment('');
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
      <h3>Comments</h3>
      <p>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={addComment}>add comment</button>
      </p>
      <ul>
        {blog.comments &&
          blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
      </ul>
    </div>
  );
}

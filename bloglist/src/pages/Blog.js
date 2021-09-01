import { ListItemText } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
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
  const style = { fontSize: '20px', marginRight: '5px' };
  return (
    <div className="blog">
      <h2>{title}</h2>
      <p style={style}>{url}</p>
      <p style={style}>
        likes {likes}{' '}
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: 'green', marginLeft: '10px' }}
          onClick={likeBlog}
        >
          like
        </Button>
      </p>
      <p style={style}>added by {author}</p>
      <Button
        onClick={deleteBlog}
        className="btn"
        id="remove-btn"
        color="secondary"
        variant="contained"
      >
        remove
      </Button>
      <h3>Comments</h3>
      <p>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button
          onClick={addComment}
          variant="outline"
          color="primary"
          style={{ marginLeft: '10px' }}
        >
          add comment
        </Button>
      </p>
      <List>
        {blog.comments &&
          blog.comments.map((comment, index) => (
            <ListItemText key={index}>{comment}</ListItemText>
          ))}
      </List>
    </div>
  );
}

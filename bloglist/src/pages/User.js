import { List, ListItemText, Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUsers } from '../reducers/userReducer';

export default function User() {
  const { id } = useParams();
  const users = useSelector(selectUsers);
  if (users.length === 0) {
    return null;
  }
  const user = users.find((user) => user.id === id);
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>

      <List component={Paper}>
        {user.blogs.map((blog) => (
          <ListItemText key={blog.id} primary={blog.title} />
        ))}
      </List>
    </div>
  );
}

import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncFailure,
  selectNotis,
} from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';
import { setToken } from '../services/blogs';
import { login } from '../services/login';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { notification, success } = useSelector(selectNotis);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      );
      dispatch(setUser(user));
      setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (e) {
      dispatch(asyncFailure('Wrong username or password'));
    }
  };

  return (
    <>
      <h2>log in to app</h2>
      {notification && (
        <p className={`${success ? 'notificacion' : 'error'}`}>
          {notification}
        </p>
      )}
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="text"
            value={username}
            id="username"
            name="username"
            label="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            value={password}
            name="password"
            label="password"
            onChange={({ target }) => setPassword(target.value)}
          />{' '}
        </div>{' '}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="login-btn"
          style={{ marginTop: '5px' }}
        >
          login
        </Button>
      </form>
    </>
  );
}

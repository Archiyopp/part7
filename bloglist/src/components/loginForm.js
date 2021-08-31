import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncFailure,
  selectNotis,
} from '../reducers/notificationReducer';
import { setToken } from '../services/blogs';
import { login } from '../services/login';

export default function LoginForm({ setUser }) {
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
      setToken(user.token);
      setUser(user);
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
          username{' '}
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />{' '}
        </div>{' '}
        <button type="submit" id="login-btn">
          login
        </button>{' '}
      </form>
    </>
  );
}

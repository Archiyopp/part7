import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser, selectUser } from '../reducers/userReducer';

export default function Menu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(removeUser());
  };
  const userWelcome = user ? (
    <>
      <em>{user.name} logged-in </em>
      <Button
        color="inherit"
        onClick={logOut}
        className="btn"
        id="logout"
      >
        Log out
      </Button>
    </>
  ) : null;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Button color="inherit" component={Link} to="/">
          Blogs{' '}
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users{' '}
        </Button>
        {userWelcome}
      </Toolbar>
    </AppBar>
  );
}

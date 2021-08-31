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
      {user.name} logged-in{' '}
      <button onClick={logOut} className="btn" id="logout">
        Log out
      </button>
    </>
  ) : null;
  return (
    <div>
      <Link to="/">Blogs </Link>
      <Link to="/users">Users </Link>
      {userWelcome}
    </div>
  );
}

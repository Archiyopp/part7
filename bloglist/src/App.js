import React, { useEffect } from 'react';
import { setToken } from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Users from './components/Users';
import Menu from './components/Menu';
import User from './pages/User';
import Blog from './pages/Blog';
import { selectNotis } from './reducers/notificationReducer';
import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const App = () => {
  const dispatch = useDispatch();
  const { notification, success } = useSelector(selectNotis);
  useEffect(() => {
    const loggedInUser =
      window.localStorage.getItem('loggedBlogAppUser') || null;
    if (loggedInUser) {
      const loggedUser = JSON.parse(loggedInUser);
      dispatch(setUser(loggedUser));
      setToken(loggedUser.token);
    }
  }, []);

  return (
    <Container>
      <Router>
        <Menu />
        {notification && (
          <Alert severity={`${success ? 'success' : 'error'}`}>
            {notification}
          </Alert>
        )}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;

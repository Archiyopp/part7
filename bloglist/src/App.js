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
    <div className="container">
      <Router>
        <Menu />
        {notification && (
          <p className={`${success ? 'notification' : 'error'}`}>
            {notification}
          </p>
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
    </div>
  );
};

export default App;

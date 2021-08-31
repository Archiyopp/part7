import React, { useEffect } from 'react';
import { setToken } from './services/blogs';
import { useDispatch } from 'react-redux';
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

const App = () => {
  const dispatch = useDispatch();
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
        </Switch>
      </Router>
    </div>
  );
};

export default App;

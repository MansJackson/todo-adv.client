import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { RootState, RouteProps } from './types';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { notifyA, setIsLoggedInA } from './redux/actions';
import LoadingPage from './pages/LoadingPage';
import List from './pages/List';
import Home from './pages/Home';

const url = process.env.REACT_APP_SERVER_URL || 'https://mj-todo-server.herokuapp.com/';

const Routes: React.FunctionComponent<RouteProps> = (props): JSX.Element => {
  const {
    setIsLoggedIn, isLoggedIn, notification,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${url}/auth/valid_cookie`, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else setIsLoggedIn(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, [setIsLoading, setIsLoggedIn]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {!isLoggedIn ? <Home /> : <Redirect to="/dashboard" />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {isLoggedIn ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/dashboard">
          {!isLoggedIn ? <Redirect to="/" /> : <Dashboard />}
        </Route>
        <Route path="/list/:id">
          {!isLoggedIn ? <Redirect to="/" /> : <List />}
        </Route>
        <Route component={NotFound} />
      </Switch>
      <div className={`notification ${notification.show ? 'show' : 'hide'}`}>{notification.text}</div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.isLoggedIn,
  notification: state.notification,
});

export default connect(mapStateToProps, {
  setIsLoggedIn: setIsLoggedInA,
  notify: notifyA,
})(Routes);

import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { RootState, RouteProps } from './types';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const Routes: React.FunctionComponent<RouteProps> = (props): JSX.Element => {
  const { isLoggedIn, notification } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {!isLoggedIn ? <Redirect to="/login" /> : <Dashboard />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {isLoggedIn ? <Redirect to="/" /> : <Register />}
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

export default connect(mapStateToProps, {})(Routes);

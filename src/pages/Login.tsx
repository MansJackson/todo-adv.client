import React from 'react';
import { connect } from 'react-redux';
import { notifyA, setFormValueA, setIsLoggedInA } from '../actions';
import Navbar from '../components/Navbar';
import {
  LoginProps,
  LoginState,
  RootState,
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
} from '../types';

const Login: React.FunctionComponent<LoginProps> = (props): JSX.Element => {
  const {
    setValue,
    notify,
    setIsLoggedIn,
    email,
    password,
  } = props;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 401) {
          notify('Invalid Credentials');
          return;
        }
        if (res.status === 404) {
          notify('Something went wrong. Try again later');
          return;
        }
        if (res.status === 200) {
          setIsLoggedIn(true);
          return;
        }
        notify('Internal server error');
      })
      .catch((err: Error) => notify(err.message));
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          type="text"
          className="login_email"
          onChange={(e) => setValue(SET_LOGIN_EMAIL, e.target.value)}
        />

        <input
          value={password}
          type="password"
          className="login_password"
          onChange={(e) => setValue(SET_LOGIN_PASSWORD, e.target.value)}
        />
        <button type="submit" className="login_btn">Log In</button>
      </form>
    </>
  );
};

const mapStateToProps = (state: RootState): LoginState => ({
  email: state.login.email,
  password: state.login.password,
});

export default connect(
  mapStateToProps,
  {
    setValue: setFormValueA,
    notify: notifyA,
    setIsLoggedIn: setIsLoggedInA,
  },
)(Login);

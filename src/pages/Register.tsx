import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { notifyA } from '../actions';
import Navbar from '../components/Navbar';
import { RegisterProps } from '../types';
import isValidEmail from '../utils';

const Register: React.FunctionComponent<RegisterProps> = (props): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const { notify } = props;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      notify('Invalid email address');
      return;
    }
    if (password !== passwordConf) {
      notify('Passwords do not match');
      return;
    }
    fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name, email, password, passwordConf,
      }),
    })
      .then((res) => {
        if (res.status === 409) {
          notify('Email is already in use');
          return;
        }
        if (res.status === 400) {
          notify('Check required fields');
          return;
        }
        if (res.status === 201) {
          window.location.href = '/login';
          return;
        }
        notify('Internal server error. Try again later');
      })
      .catch(() => notify('Internal server error. Try again later'));
  };

  return (
    <>
      <Navbar>
        <Link to="/login">Log In</Link>
        <Link to="/register">Register</Link>
      </Navbar>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          name="name"
          className=""
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={email}
          name="email"
          className=""
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          name="password"
          className=""
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          value={passwordConf}
          name="passwordConf"
          className=""
          placeholder="Confirm password"
          onChange={(e) => setPasswordConf(e.target.value)}
        />

        <button type="submit" className="register_btn">Register</button>
      </form>
    </>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  notify: notifyA,
})(Register);

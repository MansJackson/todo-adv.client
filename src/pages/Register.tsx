import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { notifyA } from '../redux/actions';
import Navbar from '../components/Navbar';
import { RegisterProps } from '../types';
import isValidEmail from '../utils';

const url = process.env.NODE_ENV === 'production' ? 'https://mj-todo-server.herokuapp.com/' : 'http://localhost:8000';

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
    if (password.length < 8) {
      notify('Password needs to be atleast 8 characters long');
      return;
    }
    if (password !== passwordConf) {
      notify('Passwords do not match');
      return;
    }
    fetch(`${url}/auth/register`, {
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
    <div className="wrapper">
      <Navbar />
      <section className="form_body">
        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Fixes material ui bug for some reason */}
          <input type="search" autoComplete="off" style={{ visibility: 'hidden' }} />

          <TextField
            fullWidth
            helperText="name"
            label="Name"
            variant="outlined"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="space" />

          <TextField
            fullWidth
            helperText="email"
            label="Email"
            variant="outlined"
            value={email}
            autoComplete="new-password"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space" />

          <TextField
            fullWidth
            helperText="password"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="space" />

          <TextField
            fullWidth
            helperText="passwordConf"
            type="password"
            label="Confirm Password"
            variant="outlined"
            value={passwordConf}
            autoComplete="new-password"
            onChange={(e) => setPasswordConf(e.target.value)}
          />

          <div className="space-2" />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>

          <div className="space-2" />
          <hr />
          <div className="space-2" />

          <p className="form_footer_text">
            Already have an account?
            {' '}
            <Link to="/login" className="link_text">Log In</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  notify: notifyA,
})(Register);

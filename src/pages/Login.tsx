import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { loginA, notifyA } from '../redux/actions';
import Navbar from '../components/Navbar';
import { LoginProps } from '../types';
import '../styles/Form.css';

const Login: React.FunctionComponent<LoginProps> = (props): JSX.Element => {
  const { notify, login } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    login(email, password, (err) => {
      if (err) notify(err.message);
      else setEmail('');
    });
    setPassword('');
  };

  return (
    <div className="wrapper">
      <Navbar />
      <section className="form_body">
        <form className="login_form" onSubmit={handleSubmit}>

          {/* Fixes material ui bug for some reason */}
          <input autoComplete="false" style={{ visibility: 'hidden' }} />

          <TextField
            helperText="email"
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space" />

          <TextField
            helperText="password"
            type="password"
            fullWidth
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="space-2" />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log In
          </Button>

          <div className="space-2" />
          <hr />
          <div className="space-2" />

          <p className="form_footer_text">
            Don't have an account?
            {' '}
            <Link to="/register" className="link_text">Register</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  notify: notifyA,
  login: loginA,
})(Login);

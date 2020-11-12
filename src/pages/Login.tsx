import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginA, notifyA } from '../actions';
import Navbar from '../components/Navbar';
import { LoginProps } from '../types';

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
    <>
      <Navbar>
        <Link to="/login">Log In</Link>
      </Navbar>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          type="text"
          className="login_email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          value={password}
          type="password"
          className="login_password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login_btn">Log In</button>
      </form>
    </>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  notify: notifyA,
  login: loginA,
})(Login);

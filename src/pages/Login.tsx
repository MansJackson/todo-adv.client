import React from 'react';
import { connect } from 'react-redux';
import { LoginProps, LoginState, RootState, SET_LOGIN_EMAIL, SET_LOGIN_PASSWORD } from '../types';
import { setFormValue } from '../actions';

const Login: React.FunctionComponent<LoginProps> = (props): JSX.Element => {
  const { setValue, email, password } = props

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Verify in frontend
    // Send to backend(also verifies)
    // Clear state
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        name="login_email"
        type="text"
        className="login_email"
        onChange={(e) => setValue(SET_LOGIN_EMAIL, e.target.value)}
      />
      <input
        value={password}
        name="login_email"
        type="password"
        className="login_password"
        onChange={(e) => setValue(SET_LOGIN_PASSWORD, e.target.value)}
      />
      <button type="submit" className="login_btn">Log In</button>
    </form>
  );
}

const mapStateToProps = (state: RootState): LoginState => ({
  email: state.login.email,
  password: state.login.password,
});

export default connect(
  mapStateToProps,
  {
    setValue: setFormValue,
  }
)(Login);
import React from 'react';
import { connect } from 'react-redux';
import { setFormValue } from '../actions';
import { RegisterProps, RootState, SET_REGISTER_EMAIL, SET_REGISTER_NAME, SET_REGISTER_PASSWORD, SET_REGISTER_PASSWORD_CONF } from '../types';

const Register: React.FunctionComponent<RegisterProps> = (props): JSX.Element => {
  const { setValue, email, name, password, passwordConf } = props;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Verify in frontend
    // Send to backend(also verifies)
    // clear state
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        name="name"
        className=""
        onChange={(e) => setValue(SET_REGISTER_NAME, e.target.value)}
      />
      <input
        type="text"
        value={email}
        name="email"
        className=""
        onChange={(e) => setValue(SET_REGISTER_EMAIL, e.target.value)}
      />
      <input
        type="password"
        value={password}
        name="password"
        className=""
        onChange={(e) => setValue(SET_REGISTER_PASSWORD, e.target.value)}
      />
      <input
        type="password"
        value={passwordConf}
        name="passwordConf"
        className=""
        onChange={(e) => setValue(SET_REGISTER_PASSWORD_CONF ,e.target.value)}
      />
      <button type="submit" className="register_btn">Register</button>
    </form>
  );
}

const mapStateToProps = (state: RootState) => ({
  name: state.register.name,
  email: state.register.email,
  password: state.register.password,
  passwordConf: state.register.passwordConf,
});

export default connect(mapStateToProps, {
  setValue: setFormValue,
})(Register);
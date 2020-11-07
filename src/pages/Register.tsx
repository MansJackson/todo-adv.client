import React from 'react';
import { connect } from 'react-redux';
import { setFormValueA, setFormMessageA, setValidFieldA } from '../actions';
import {
  FormMessagesState,
  RegisterProps,
  RegisterState,
  RootState,
  SET_EMAIL_MESSAGE,
  SET_PASSWORD_CONF_MESSAGE,
  SET_PASSWORD_MESSAGE,
  SET_REGISTER_EMAIL,
  SET_REGISTER_NAME,
  SET_REGISTER_PASSWORD,
  SET_REGISTER_PASSWORD_CONF,
  SET_VALID_EMAIL,
  SET_VALID_PASSWORD,
  SET_VALID_PASSWORD_CONF,
} from '../types';
import isValidEmail from '../utils';

const Register: React.FunctionComponent<RegisterProps> = (props): JSX.Element => {
  const {
    setValue, setFormMsg, setValidField, email, name, password, passwordConf, formMessages,
  } = props;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Verify in frontend
    // Send to backend(also verifies)
    // clear state
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(SET_REGISTER_EMAIL, e.target.value);
    if (!isValidEmail(email)) {
      setValidField(SET_VALID_EMAIL, false);
      setFormMsg(SET_EMAIL_MESSAGE, 'Email is invalid');
    } else {
      setValidField(SET_VALID_EMAIL, true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(SET_REGISTER_PASSWORD, e.target.value);
    if (password.length < 8) {
      setFormMsg(SET_PASSWORD_MESSAGE, 'Password must be atleast 8 characters');
      setValidField(SET_VALID_PASSWORD, false);
    } else {
      setValidField(SET_VALID_PASSWORD, true);
    }
  };

  const handlePasswordConfBlur = () => {
    if (passwordConf !== password) {
      setFormMsg(SET_PASSWORD_CONF_MESSAGE, 'Passwords do not match');
      setValidField(SET_VALID_PASSWORD_CONF, false);
    } else {
      setValidField(SET_VALID_PASSWORD_CONF, true);
    }
  };

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
        onChange={handleEmailChange}
      />
      {!formMessages.validEmail
        ? <p className="email_text">{formMessages.emailMsg}</p>
        : null}

      <input
        type="password"
        value={password}
        name="password"
        className=""
        onChange={handlePasswordChange}
      />
      {!formMessages.validPassword
        ? <p className="password_text">{formMessages.passwordMsg}</p>
        : null}

      <input
        type="password"
        value={passwordConf}
        name="passwordConf"
        className=""
        onBlur={handlePasswordConfBlur}
        onChange={(e) => setValue(SET_REGISTER_PASSWORD_CONF, e.target.value)}
      />
      {!formMessages.validPasswordConf
        ? <p className="passwordConf_text">{formMessages.passwordConfMsg}</p>
        : null}

      <button type="submit" className="register_btn">Register</button>
    </form>
  );
};

const mapStateToProps = (
  state: RootState,
): RegisterState & { formMessages: FormMessagesState } => ({
  name: state.register.name,
  email: state.register.email,
  password: state.register.password,
  passwordConf: state.register.passwordConf,
  formMessages: state.formMessages,
});

export default connect(mapStateToProps, {
  setValue: setFormValueA,
  setValidField: setValidFieldA,
  setFormMsg: setFormMessageA,
})(Register);

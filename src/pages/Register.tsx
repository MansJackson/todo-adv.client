import React from 'react';
import { connect } from 'react-redux';
import {
  setFormValueA,
  setFormMessageA,
  setValidFieldA,
  notifyA,
} from '../actions';
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
    notify, setValue, setFormMsg, setValidField, email, name, password, passwordConf, formMessages,
  } = props;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { validEmail, validPassword, validPasswordConf } = formMessages;
    if (!validEmail || !validPassword || !validPasswordConf) {
      notify('Check required fields');
      return;
    }
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(SET_REGISTER_EMAIL, e.target.value);
    if (isValidEmail(email)) {
      setValidField(SET_VALID_EMAIL, true);
      return;
    }
    setValidField(SET_VALID_EMAIL, false);
    setFormMsg(SET_EMAIL_MESSAGE, 'Email is invalid');
  };

  const handleEmailBlur = () => {
    if (email === '') {
      setValidField(SET_VALID_EMAIL, true);
      return;
    }
    fetch('http://localhost:3000/api/email_exists')
      .then((res) => {
        if (res.status === 409) {
          setValidField(SET_VALID_EMAIL, false);
          setFormMsg(SET_EMAIL_MESSAGE, 'Email already exists');
          return;
        }
        if (res.status === 200) setValidField(SET_VALID_EMAIL, true);
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(SET_REGISTER_PASSWORD, e.target.value);
    if (password.length >= 8 || password === '') {
      setValidField(SET_VALID_PASSWORD, true);
      return;
    }
    setFormMsg(SET_PASSWORD_MESSAGE, 'Password must be atleast 8 characters');
    setValidField(SET_VALID_PASSWORD, false);
  };

  const handlePasswordConfBlur = () => {
    if (passwordConf !== password && passwordConf !== '' && formMessages.validPassword) {
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
        onBlur={handleEmailBlur}
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
  notify: notifyA,
})(Register);

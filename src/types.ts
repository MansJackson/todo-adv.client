// Action-types
export const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
export const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';

export const SET_REGISTER_NAME = 'SET_REGISTER_NAME';
export const SET_REGISTER_EMAIL = 'SET_REGISTER_EMAIL';
export const SET_REGISTER_PASSWORD = 'SET_REGISTER_PASSWORD';
export const SET_REGISTER_PASSWORD_CONF = 'SET_REGISTER_PASSWORD_CONF';

export const SET_VALID_EMAIL = 'SET_VALID_EMAIL';
export const SET_VALID_PASSWORD = 'SET_VALID_PASSWORD';
export const SET_VALID_PASSWORD_CONF = 'SET_VALID_PASSWORD_CONF';

export const SET_EMAIL_MESSAGE = 'SET_EMAIL_MESSAGE';
export const SET_PASSWORD_MESSAGE = 'SET_PASSWORD_MESSAGE';
export const SET_PASSWORD_CONF_MESSAGE = 'SET_PASSWORD_CONF_MESSAGE';

// Actions
export type LoginAction = {
  type: string;
  payload: string;
};

export type RegisterAction = {
  type: string;
  payload: string;
};

export type FormMessageAction = {
  type: string;
  message?: string;
  valid?: boolean;
};

// States
export type RootState = {
  login: LoginState;
  register: RegisterState;
  formMessages: FormMessagesState;
};

export type LoginState = {
  email: string;
  password: string;
};

export type RegisterState = {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
};

export type FormMessagesState = {
  validEmail: boolean;
  validPassword: boolean;
  validPasswordConf: boolean;
  emailMsg: string;
  passwordMsg: string;
  passwordConfMsg: string;
};

// Props
export type LoginProps = {
  email: string;
  password: string;
  setValue: (type: string, payload: string) => void;
};

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
  formMessages: FormMessagesState;
  setValue: (type: string, payload: string) => void;
  setValidField: (type: string, payload: boolean) => void;
  setFormMsg: (type: string, payload: string) => void;
};

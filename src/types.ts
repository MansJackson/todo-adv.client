// Action-types
export const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
export const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
export const SET_REGISTER_NAME = 'SET_REGISTER_NAME';
export const SET_REGISTER_EMAIL = 'SET_REGISTER_EMAIL';
export const SET_REGISTER_PASSWORD = 'SET_REGISTER_PASSWORD';
export const SET_REGISTER_PASSWORD_CONF = 'SET_REGISTER_PASSWORD_CONF';

// Actions
export type LoginAction = {
  type: string;
  payload: string;
}

// States
export type RootState = {
  login: LoginProps;
  register: RegisterProps;
}

export type LoginState = {
  email: string;
  password: string;
}

export type RegisterState = {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

// Props
export type LoginProps = {
  email: string;
  password: string;
  setValue: (type: string, payload: string) => void;
}

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
  setValue: (type: string, payload: string) => void;
}

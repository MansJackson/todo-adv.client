import { combineReducers } from 'redux';
import {
  LoginAction,
  LoginState,
  RegisterState,
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
  SET_REGISTER_EMAIL,
  SET_REGISTER_PASSWORD,
  SET_REGISTER_NAME,
  SET_REGISTER_PASSWORD_CONF,
} from './types';

const defaultLoginState = { email: '', password: '' };
const defaultRegisterState = { name: '', email: '', password: '', passwordConf: '' };

const loginReducer = (state = defaultLoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case SET_LOGIN_EMAIL:
      return { ...state, email: action.payload }
    case SET_LOGIN_PASSWORD:
      return { ...state, password: action.payload }
    default:
      return state;
  }
}

const registerReducer = (state = defaultRegisterState, action: LoginAction): RegisterState => {
  switch (action.type) {
    case SET_REGISTER_NAME:
      return { ...state, name: action.payload }
    case SET_REGISTER_EMAIL:
      return { ...state, email: action.payload }
    case SET_REGISTER_PASSWORD:
      return { ...state, password: action.payload }
    case SET_REGISTER_PASSWORD_CONF:
      return { ...state, passwordConf: action.payload }
    default:
      return state;
  }
}

export default combineReducers({
  loginReducer,
  registerReducer,
});
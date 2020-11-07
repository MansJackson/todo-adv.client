import { combineReducers } from 'redux';
import {
  LoginState,
  RegisterState,
  LoginAction,
  RegisterAction,
  FormMessageAction,
  NotificationAction,
  LoggedInAction,
  LoadingAction,
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
  SET_REGISTER_EMAIL,
  SET_REGISTER_PASSWORD,
  SET_REGISTER_NAME,
  SET_REGISTER_PASSWORD_CONF,
  SET_EMAIL_MESSAGE,
  SET_PASSWORD_MESSAGE,
  SET_PASSWORD_CONF_MESSAGE,
  SET_VALID_EMAIL,
  SET_VALID_PASSWORD,
  SET_VALID_PASSWORD_CONF,
  SET_IS_LOGGED_IN,
  SET_NOTIFICATION_TEXT,
  SET_NOTIFICATION_SHOW,
  SET_IS_LOADING,
} from './types';

const defaultNotificationState = { text: '', show: false };
const defaultLoginState = { email: '', password: '' };
const defaultRegisterState = {
  name: '',
  email: '',
  password: '',
  passwordConf: '',
};
const defaultFormMessageState = {
  emailMsg: '',
  passwordMsg: '',
  passwordConfMsg: '',
  validEmail: true,
  validPassword: true,
  validPasswordConf: true,
};

const formMessagesReducer = (state = defaultFormMessageState, action: FormMessageAction) => {
  switch (action.type) {
    case SET_EMAIL_MESSAGE:
      return { ...state, emailMsg: action.message! };
    case SET_PASSWORD_MESSAGE:
      return { ...state, passwordMsg: action.message! };
    case SET_PASSWORD_CONF_MESSAGE:
      return { ...state, passwordConfMsg: action.message! };
    case SET_VALID_EMAIL:
      return { ...state, validEmail: action.valid! };
    case SET_VALID_PASSWORD:
      return { ...state, validPassword: action.valid! };
    case SET_VALID_PASSWORD_CONF:
      return { ...state, validPasswordConf: action.valid! };
    default:
      return state;
  }
};

const loginReducer = (state = defaultLoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case SET_LOGIN_EMAIL:
      return { ...state, email: action.payload };
    case SET_LOGIN_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const registerReducer = (state = defaultRegisterState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case SET_REGISTER_NAME:
      return { ...state, name: action.payload };
    case SET_REGISTER_EMAIL:
      return { ...state, email: action.payload };
    case SET_REGISTER_PASSWORD:
      return { ...state, password: action.payload };
    case SET_REGISTER_PASSWORD_CONF:
      return { ...state, passwordConf: action.payload };
    default:
      return state;
  }
};

const loggedInReducer = (state = false, action: LoggedInAction): boolean => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
};

const notificationReducer = (state = defaultNotificationState, action: NotificationAction) => {
  switch (action.type) {
    case SET_NOTIFICATION_TEXT:
      return { ...state, text: action.text };
    case SET_NOTIFICATION_SHOW:
      return { ...state, show: action.show };
    default:
      return state;
  }
};

const isLoadingReducer = (state = true, action: LoadingAction) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;
    default: return state;
  }
};

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  formMessages: formMessagesReducer,
  isLoggedIn: loggedInReducer,
  notification: notificationReducer,
  isLoading: isLoadingReducer,
});

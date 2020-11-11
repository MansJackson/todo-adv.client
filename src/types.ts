import { Socket } from 'socket.io-client';

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

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_NOTIFICATION_TEXT = 'SET_NOTIFICATION_TEXT';
export const SET_NOTIFICATION_SHOW = 'SET_NOTIFICATION_SHOW';

export const SET_OWNED_LISTS = 'SET_OWNED_LISTS';
export const SET_SHARED_LISTS = 'SET_SHARED_LISTS';

export const SET_SOCKET = 'SET_SOCKET';
export const CLEAR_SOCKET = 'CLEAR_SOCKET';

// Actions
export type SocketAction = {
  type: string;
  socket: Socket;
};

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

export type LoggedInAction = {
  type: string;
  payload: boolean;
};

export type NotificationAction = {
  type: string;
  text: string;
  show: boolean;
};

export type LoadingAction = {
  type: string;
  payload: boolean;
};

export type ListsAction = {
  type: string;
  owned: List[];
  shared: List[];
};

// States
export type RootState = {
  login: LoginState;
  register: RegisterState;
  formMessages: FormMessagesState;
  isLoggedIn: boolean;
  notification: NotificationState;
  isLoading: boolean;
  lists: ListsState;
  socket: Socket;
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

export type NotificationState = {
  show: boolean;
  text: string;
};

export type ListsState = {
  owned: List[],
  shared: List[],
};

// Props
export type NavbarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (payload: boolean) => void;
};

export type LoginProps = {
  email: string;
  password: string;
  setValue: (type: string, payload: string) => void;
  notify: (message: string) => void;
  login: (email: string, password: string, cb: Callback) => void;
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
  notify: (message: string) => void;
};

export type RouteProps = {
  isLoggedIn: boolean;
  notification: NotificationState;
  isLoading: boolean;
  setIsLoading: (payload: boolean) => void;
  setIsLoggedIn: (payload: boolean) => void;
  notify: (message: string) => void;
};

export type DashboardProps = {
  owned: List[];
  shared: List[];
  getLists: (cb: Callback) => void;
  postList: (title: string, cb: Callback) => void;
  notify: (message: string) => void;
  connectSocket: () => void;
};

export type ModalOwnProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export type ListProps = {
  isLoading: boolean;
  socket: Socket;
  setIsLoading: (payload: boolean) => void;
  getList: (id: string, cb: Callback) => void;
  notify: (message: string) => void;
};

export type ListSummaryOwnProps = {
  data: List;
};

// Otther
export type List = {
  id: string;
  title: string;
  owner: string;
  editors: string[];
  items: string[];
};

export type Callback = (err: Error | undefined, data: any | undefined) => void;

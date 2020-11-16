import { Socket } from 'socket.io-client';

// Action-types
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_NOTIFICATION_TEXT = 'SET_NOTIFICATION_TEXT';
export const SET_NOTIFICATION_SHOW = 'SET_NOTIFICATION_SHOW';

export const SET_OWNED_LISTS = 'SET_OWNED_LISTS';
export const SET_SHARED_LISTS = 'SET_SHARED_LISTS';

export const SET_SOCKET = 'SET_SOCKET';
export const CLEAR_SOCKET = 'CLEAR_SOCKET';

export const SET_AM_I_OWNER = 'SET_AM_I_OWNER';
export const SET_COOKIE = 'SET_COOKIE';

// Actions
export type SocketAction = {
  type: string;
  socket: Socket;
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

export type ListsAction = {
  type: string;
  owned: List[];
  shared: List[];
};

export type AmIOwnerAction = {
  type: string;
  payload: boolean;
};

// States
export type RootState = {
  isLoggedIn: boolean;
  notification: NotificationState;
  lists: ListsState;
  socket: Socket;
  amIOwner: boolean;
  cookie: string;
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

export type NavbarOwnProps = {
  filled?: true;
};

export type LoginProps = {
  notify: (message: string) => void;
  login: (email: string, password: string, cb: Callback) => void;
};

export type RegisterProps = {
  notify: (message: string) => void;
};

export type RouteProps = {
  isLoggedIn: boolean;
  notification: NotificationState;
  setIsLoggedIn: (payload: boolean) => void;
  notify: (message: string) => void;
  setCookie: (payload: string) => void;
};

export type DashboardProps = {
  owned: List[];
  shared: List[];
  socket: Socket;
  cookie: string;
  getLists: (cb: Callback) => void;
  postList: (title: string, cb: Callback) => void;
  notify: (message: string) => void;
  connectSocket: (cookie: string) => void;
};

export type ModalOwnProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export type ListProps = {
  socket: Socket;
  amIOwner: boolean;
  setAmIOwner: (payload: boolean) => void;
  getList: (id: string, cb: Callback) => void;
  notify: (message: string) => void;
};

export type ListSummarProps = {
  socket: Socket;
};

export type ListSummaryOwnProps = {
  data: List;
  owned?: true;
};

export type ListItemProps = {
  socket: Socket;
};

export type ListItemOwnProps = {
  item: ListItem;
  listId: string;
};

// Other
export type List = {
  id: string;
  title: string;
  owner: {
    id: string,
    initials: string,
    mousePosition: { x: number, y: number },
    connected: boolean,
  };
  editors: {
    id: string,
    initials: string,
    mousePosition: { x: number, y: number },
    connected: boolean,
    color: number,
  }[];
  items: { id: string, text: string, completed: boolean }[];
};

export type ListItem = {
  id: string;
  completed: boolean;
  text: string;
};

export type Callback = (err: Error | undefined, data: any | undefined) => void;

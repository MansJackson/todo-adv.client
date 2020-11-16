import { combineReducers } from 'redux';
import { Socket } from 'socket.io-client';
import {
  NotificationAction,
  LoggedInAction,
  ListsAction,
  AmIOwnerAction,
  SocketAction,
  SET_IS_LOGGED_IN,
  SET_NOTIFICATION_TEXT,
  SET_NOTIFICATION_SHOW,
  SET_OWNED_LISTS,
  SET_SHARED_LISTS,
  SET_SOCKET,
  CLEAR_SOCKET,
  SET_AM_I_OWNER,
  SET_COOKIE,
} from '../types';

const defaultNotificationState = { text: '', show: false };
const defaultListState = {
  ownedLists: [{}],
  sharedLists: [{}],
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

const listsReducer = (state = defaultListState, action: ListsAction) => {
  switch (action.type) {
    case SET_OWNED_LISTS:
      return { ...state, owned: action.owned };
    case SET_SHARED_LISTS:
      return { ...state, shared: action.shared };
    default:
      return state;
  }
};

const socketReducer = (state: null | Socket = null, action: SocketAction) => {
  switch (action.type) {
    case SET_SOCKET:
      return action.socket;
    case CLEAR_SOCKET:
      return null;
    default:
      return state;
  }
};

const amIOwnerreducer = (state = false, action: AmIOwnerAction) => {
  switch (action.type) {
    case SET_AM_I_OWNER:
      return action.payload;
    default:
      return state;
  }
};

const cookieReducer = (state = '', action: { type: string, payload: string }) => {
  switch (action.type) {
    case SET_COOKIE:
      return action.payload;
    default:
      return state;
  }
};
export default combineReducers({
  isLoggedIn: loggedInReducer,
  notification: notificationReducer,
  lists: listsReducer,
  socket: socketReducer,
  amIOwner: amIOwnerreducer,
  cookie: cookieReducer,
});

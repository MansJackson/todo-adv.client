import { Dispatch } from 'redux';
import { io, Socket } from 'socket.io-client';
import {
  Callback,
  List,
  SET_SOCKET,
  CLEAR_SOCKET,
  SET_IS_LOGGED_IN,
  SET_NOTIFICATION_SHOW,
  SET_NOTIFICATION_TEXT,
  SET_OWNED_LISTS,
  SET_SHARED_LISTS,
  SET_AM_I_OWNER,
  SET_COOKIE,
} from '../types';

const url = process.env.NODE_ENV === 'production' ? 'https://mj-todo-server.herokuapp.com' : 'http://localhost:8000';

export const notifyA = (message: string) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_NOTIFICATION_TEXT,
    text: message,
  });
  dispatch({
    type: SET_NOTIFICATION_SHOW,
    show: true,
  });
  setTimeout(() => {
    dispatch({
      type: SET_NOTIFICATION_SHOW,
      show: false,
    });
  }, 5000);
};

export const setIsLoggedInA = (payload: boolean) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_IS_LOGGED_IN,
    payload,
  });
};

export const connectSocketA = (cookie: string) => (dispatch: Dispatch): void => {
  const socket = io(url, {
    query: { token: `juid=${cookie}` },
  });
  socket.on('notification', (message: string) => {
    dispatch({
      type: SET_NOTIFICATION_TEXT,
      text: message,
    });
    dispatch({
      type: SET_NOTIFICATION_SHOW,
      show: true,
    });
    setTimeout(() => {
      dispatch({
        type: SET_NOTIFICATION_SHOW,
        show: false,
      });
    }, 5000);
  });

  dispatch({
    type: SET_SOCKET,
    socket,
  });
};

export const closeSocketA = (socket: Socket) => (dispatch: Dispatch): void => {
  socket.close();
  dispatch({
    type: CLEAR_SOCKET,
  });
};

export const getListsA = (cb: Callback) => (dispatch: Dispatch): void => {
  fetch(`${url}/api/lists`, { credentials: 'include' })
    .then((res) => {
      if (res.status === 204) {
        cb(new Error('No data'), undefined);
        return false;
      }
      return res.json();
    })
    .then((data: { owned: List[], shared: List[], cookie: string } | false) => {
      if (!data) {
        cb(new Error('no data'), undefined);
      } else {
        dispatch({
          type: SET_COOKIE,
          payload: data.cookie,
        });
        dispatch({
          type: SET_OWNED_LISTS,
          owned: data.owned,
        });
        dispatch({
          type: SET_SHARED_LISTS,
          shared: data.shared,
        });
        cb(undefined, 'success');
      }
    })
    .catch((err: Error) => {
      cb(err, undefined);
    });
};

export const getListA = (id: string, cb: Callback) => (dispatch: Dispatch): void => {
  fetch(`${url}/api/lists/${id}`, { credentials: 'include' })
    .then((res) => {
      if (res.status === 200) return res.json();
      cb(new Error('Could not fetch list'), undefined);
      return undefined;
    })
    .then((data: { list: List, cookie: string } | undefined) => {
      if (data) {
        dispatch({
          type: SET_COOKIE,
          payload: data.cookie,
        });
        cb(undefined, data.list);
      }
    })
    .catch((err) => {
      cb(err, undefined);
    });
};

export const postListA = (title: string, cb: Callback) => (): void => {
  fetch(`${url}/api/lists`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ title }),
  })
    .then((res) => {
      if (res.status === 201) cb(undefined, 'success');
      else cb(new Error('does not exist'), undefined);
    })
    .catch((err) => cb(err, undefined));
};

export const loginA = (
  email: string,
  password: string,
  cb: Callback,
) => (dispatch: Dispatch): void => {
  fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 401) {
        cb(new Error('Invalid credentials'), undefined);
        return;
      }
      if (res.status === 404) {
        cb(new Error('Something went wrong. Try again later'), undefined);
        return;
      }
      if (res.status === 200) {
        res.json()
          .then((data: { cookie: string }) => {
            if (data.cookie) {
              dispatch({
                type: SET_COOKIE,
                payload: data.cookie,
              });
              dispatch({
                type: SET_IS_LOGGED_IN,
                payload: true,
              });
              cb(undefined, 'Success');
            } else {
              cb(new Error('Your browser doesnt allow cross site cookies'), undefined);
            }
          })
          .catch(() => null);
      } else {
        cb(new Error('Internal server error'), undefined);
      }
    })
    .catch(() => {
      cb(new Error('Internal server error'), undefined);
    });
};

export const setAmIOwnerA = (payload: boolean) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_AM_I_OWNER,
    payload,
  });
};

export const setCookieA = (payload: string) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_COOKIE,
    payload: payload || '',
  });
};

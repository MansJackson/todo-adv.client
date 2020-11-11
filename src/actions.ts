import { Dispatch } from 'redux';
import { io, Socket } from 'socket.io-client';
import {
  Callback,
  CLEAR_SOCKET,
  List,
  SET_IS_LOADING,
  SET_IS_LOGGED_IN,
  SET_NOTIFICATION_SHOW,
  SET_NOTIFICATION_TEXT,
  SET_OWNED_LISTS,
  SET_SHARED_LISTS, SET_SOCKET,
} from './types';

export const setFormValueA = (type: string, payload: string) => (dispatch: Dispatch): void => {
  dispatch({
    type,
    payload,
  });
};

export const setFormMessageA = (type: string, message: string) => (dispatch: Dispatch): void => {
  dispatch({
    type,
    message,
  });
};

export const setValidFieldA = (type: string, valid: boolean) => (dispatch: Dispatch): void => {
  dispatch({
    type,
    valid,
  });
};

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

export const setIsLoadingA = (payload: boolean) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_IS_LOADING,
    payload,
  });
};

export const setOwnedListA = (owned: List[]) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_OWNED_LISTS,
    owned,
  });
};

export const setSharedListA = (shared: List[]) => (dispatch: Dispatch): void => {
  dispatch({
    type: SET_SHARED_LISTS,
    shared,
  });
};

export const connectSocketA = () => (dispatch: Dispatch): void => {
  const socket = io('http://localhost:8000');
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

export const getListsA = (cb: Callback) => (dispatch: Dispatch) => {
  fetch('http://localhost:8000/api/lists', { credentials: 'include' })
    .then((res) => {
      if (res.status === 204) cb(new Error('No data'), undefined);
      return res.json();
    })
    .then((data: { owned: List[], shared: List[] } | false) => {
      if (!data) {
        cb(new Error('no data'), undefined);
      } else {
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
    .catch((err: Error) => cb(err, undefined));
};

export const getListA = (id: string, cb: Callback) => (dispatch: Dispatch) => {
  fetch(`http://localhost:8000/api/lists/${id}`, { credentials: 'include' })
    .then((res) => {
      if (res.status === 200) return res.json();
      cb(new Error('Could not fetch list'), undefined);
      return undefined;
    })
    .then((data: { list: List } | undefined) => {
      if (data) cb(undefined, data.list);
    })
    .catch((err) => {
      cb(err, undefined);
    });
};

export const postListA = (title: string, cb: Callback) => (dispatch: Dispatch) => {
  fetch('http://localhost:8000/api/lists', {
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

export const loginA = (email: string, password: string, cb: Callback) => (dispatch: Dispatch) => {
  fetch('http://localhost:8000/auth/login', {
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
        dispatch({
          type: SET_IS_LOGGED_IN,
          payload: true,
        });
        cb(undefined, 'Success');
        return;
      }
      cb(new Error('Internal server error'), undefined);
    })
    .catch((err: Error) => {
      cb(new Error('Internal server error'), undefined);
    });
};

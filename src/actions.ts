import { Dispatch } from 'redux';
import {
  List,
  SET_IS_LOADING,
  SET_IS_LOGGED_IN, SET_NOTIFICATION_SHOW, SET_NOTIFICATION_TEXT, SET_OWNED_LISTS, SET_SHARED_LISTS,
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

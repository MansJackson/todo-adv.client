import { Dispatch } from 'redux';

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

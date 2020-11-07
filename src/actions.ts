import { Dispatch } from 'redux';

export const setFormValue = (type: string, payload: string) => (dispatch: Dispatch): void => {
  dispatch({
    type,
    payload,
  });
};

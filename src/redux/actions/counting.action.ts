import {Dispatch} from 'redux';

export enum CountingKeys {
  SET_COUNTING = 'SET_COUNTING',
}

export const setCounting = (count: number) => (dispatch: Dispatch) =>
  dispatch({
    type: CountingKeys.SET_COUNTING,
    payload: count,
  });

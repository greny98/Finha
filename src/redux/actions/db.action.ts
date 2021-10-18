import {Dispatch} from 'redux';

export enum DatabaseKeys {
  SET_DB = 'SET_DB',
}

export const setLocalDb = (db: any) => (dispatch: Dispatch) =>
  dispatch({
    type: DatabaseKeys.SET_DB,
    payload: db,
  });

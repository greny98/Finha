import {AnyAction} from 'redux';
import {DatabaseKeys} from 'redux/actions/db.action';

export interface IDatabaseState {
  db: any;
}

const initial = {
  db: '',
};

export default function databaseReducer(state: IDatabaseState = initial, action: AnyAction): IDatabaseState {
  switch (action.type) {
    case DatabaseKeys.SET_DB: {
      console.log(action.payload);

      return {db: action.payload};
    }
    default:
      return state;
  }
}

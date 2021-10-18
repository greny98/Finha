import {combineReducers} from 'redux';
import countingReducer from './counting.reducer';
import databaseReducer from './db.reducer';

const reducers = {
  counting: countingReducer,
  db: databaseReducer
};

export default combineReducers(reducers);

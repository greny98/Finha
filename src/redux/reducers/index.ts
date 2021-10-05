import {combineReducers} from 'redux';
import countingReducer from './counting.reducer';

const reducers = {
  counting: countingReducer,
};

export default combineReducers(reducers);

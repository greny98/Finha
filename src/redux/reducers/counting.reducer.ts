import {AnyAction} from 'redux';
import {CountingKeys} from 'redux/actions/counting.action';

export interface ICountingState {
  counting: number;
}

const initial = {
  counting: 0,
};

export default function countingReducer(state: ICountingState = initial, action: AnyAction): ICountingState {
  switch (action.type) {
    case CountingKeys.SET_COUNTING: {
      console.log(action.payload);

      return {counting: action.payload};
    }
    default:
      return state;
  }
}

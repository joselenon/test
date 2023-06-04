import * as types from '../types';

const initialState = {
  currency: 'BTC',
};

// eslint-disable-next-line func-names
export default function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_BALANCE: {
      const changeTo = action.payload.balance;
      const newState = { ...state, currency: changeTo };
      return newState;
    }

    default: {
      return state;
    }
  }
}

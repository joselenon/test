import * as types from '../types';

export function changeBalance(payload) {
  return {
    type: types.CHANGE_BALANCE,
    payload,
  };
}

import { takeLatest, put, all } from 'redux-saga/effects';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';

function* changeBalance(action) {
  const { balance } = action.payload;
  yield put(actions.changeBalance({ balance }));
}

function persistRehydrate({ payload }) {
  const balance = get(payload, 'balance', '');
  if (!balance) return;
}

export default all([
  takeLatest(types.CHANGE_BALANCE, changeBalance),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);

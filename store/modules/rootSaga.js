import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import selectedbalance from './selectedbalance/sagas';

export default function* rootSaga() {
  return yield all([auth, selectedbalance]);
}

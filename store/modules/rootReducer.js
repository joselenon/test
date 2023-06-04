import { combineReducers } from 'redux';

import auth from './auth/reducer';
import selectedbalance from './selectedbalance/reducer';

export default combineReducers({
  auth,
  selectedbalance,
});

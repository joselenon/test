import { call, put, all, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-hot-toast';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const authData = JSON.parse(localStorage.getItem('persist:authgamblance'));
    const isLoggedIn = authData && JSON.parse(authData.auth).isLoggedIn;
    if (isLoggedIn) {
      yield put(actions.loginFailure());
      toast.error("You're already logged!");
      return;
    }
    const { username, password } = payload;
    const res = yield call(axios.post, '/tokens', { username, password });
    yield put(actions.loginSuccess({ ...res.data }));
    toast.success("You're logged!");

    axios.defaults.headers.Authorization = `Bearer ${res.data.token}`;

    history.push(payload.prevPath);
  } catch (err) {
    yield put(actions.loginFailure());
    const { errors } = get(err, 'response.data', '');
    if (errors) toast.error(errors[0]);
    else {
      const { status } = err.request;
      if (!status) {
        yield put(actions.loginFailure());
        toast.error("Server is offline. We'll be right back!");
        return;
      }
      toast.error(status);
    }
    yield put(actions.loginFailure());
  }
}

function* registerRequest({ payload }) {
  try {
    const authData = JSON.parse(localStorage.getItem('persist:authgamblance'));
    const isLoggedIn = authData && JSON.parse(authData.auth).isLoggedIn;
    if (isLoggedIn) {
      yield put(actions.registerFailure());
      toast.error("You're already logged!");
      return;
    }
    const { username, email, password } = payload;
    const res = yield call(axios.post, '/users', { username, email, password });
    yield put(actions.registerSuccess({ ...res.data }));
    toast.success('You have registered!');

    history.push(payload.prevPath);
  } catch (err) {
    const { errors } = get(err, 'response.data', '');
    if (errors) toast.error(errors[0]);
    else {
      const { status } = err.request;
      if (!status) {
        yield put(actions.registerFailure());
        toast.error("Server is offline. We'll be right back!");
        return;
      }
      toast.error('Error: Status', status);
    }
    yield put(actions.registerFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);

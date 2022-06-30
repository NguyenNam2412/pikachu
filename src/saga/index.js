import { put, takeEvery, all, fork } from 'redux-saga/effects';

import { data } from '../apis/db';
import { Const } from '../constants';


function* fetchData() {
  try {
    yield put({
      type: Const.RENDER_SUCCESS,
      payload: data
    })
  } catch (err) {
    yield put({ 
      type: Const.RENDER_ERROR, 
      payload: err
    })
  }
}

function* clickIcons(action) {
  try {
    yield put({
      type: Const.CLICK_SUCCESS,
      payload: action.payload
    })
  } catch (err) {
    yield put({
      type: Const.CLICK_ERROR,
      payload: err
    })
  }
}

function* reRoll(action) {
  try {
    yield put({
      type: Const.REROLL_SUCCESS,
      payload: action.payload
    })
  } catch (err) {
    yield put({
      type: Const.REROLL_ERROR,
      payload: err
    })
  }
}

export function* watchFetchData() {
  yield takeEvery(Const.RENDER_REQUEST, fetchData);
}

export function* watchPutActions() {
  yield takeEvery(Const.CLICK_REQUEST, clickIcons);
}

export function* watchReRoll() {
  yield takeEvery(Const.REROLL_REQUEST, reRoll);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchData),
    fork(watchPutActions),
    fork(watchReRoll),
  ])
}
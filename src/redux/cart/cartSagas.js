import { takeLatest, all,put, call } from 'redux-saga/effects'
import { clearCart } from './cartActions';
import userActionTypes from '../user/userActionTypes';

export function* clearCartOnSignOut(){
    yield put(clearCart())
}

export function* onSignOutSuccess(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas () {
    yield all([call(onSignOutSuccess)])
}
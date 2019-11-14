import { takeLatest, all, call, put } from 'redux-saga/effects';

import userActionTypes from './userActionTypes';
import {
    signUpSuccess,
    signUpFailure,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure
} from './userActions';
import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase-util';

export function* getSnapshopFromUserAuth(userAuth, additionalData){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))  
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}
export function* onSignUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email,password);
        yield put(signUpSuccess({user, additionalData: { displayName } }))
    } catch (error) {
        yield put(signUpFailure(error.message))
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData }}) {
    yield getSnapshopFromUserAuth(user, additionalData)
}

export function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
export function* onSignUpStart() {
    yield takeLatest(userActionTypes.SIGN_UP_START, onSignUp)
}

export function* onGoogleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshopFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* onGoogleSignInStart() {
   yield takeLatest(userActionTypes.SIGN_IN_WITH_GOOGLE_START, onGoogleSignIn)
}


export function* onEmailSignIn(action){
    try {
        const { email, password } = action.payload;
        const { user } = yield auth.signInWithEmailAndPassword(email,password)
        yield getSnapshopFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.SIGN_IN_WITH_EMAIL_START, onEmailSignIn)
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshopFromUserAuth(userAuth);

    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* onUserSessionCheck() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure())
    }
}

export function* onSignOut() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut )
}

export function* userSagas(){
    yield all([
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onUserSessionCheck),
        call(onSignOut)
    ])
}
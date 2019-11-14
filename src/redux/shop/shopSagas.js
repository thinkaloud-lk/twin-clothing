import { takeLatest,all, call, put } from 'redux-saga/effects';
import { shopActionTypes } from './shopActionTypes';
import { firestore, convertCollectionSnaphotToMap } from '../../firebase/firebase-util'
import { fetchCollectionSuccess, fetchCollectionFailure } from './shopActions';

export function* fetchCollectionAsync() {
    try {
        const snapshot = yield firestore.collection('collections').get();
        const collectionsMap = yield call(convertCollectionSnaphotToMap,snapshot)
        yield put(fetchCollectionSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionFailure(error.messsage))
    }
}

export function* fetchCollectionStart() {
    yield takeLatest(shopActionTypes.FETCH_COLLECTION_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}
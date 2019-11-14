import { shopActionTypes } from './shopActionTypes';
import { firestore, convertCollectionSnaphotToMap } from '../../firebase/firebase-util'

export const fetchCollectionStart = () => ({
    type: shopActionTypes.FETCH_COLLECTION_START,
})

export const fetchCollectionSuccess = (collection) => ({
    type: shopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collection,
})

export const fetchCollectionFailure = (errorMessage) => ({
    type: shopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: errorMessage,
})

export const fetchCollectionAsync = () => {
    return dispatch => {
        dispatch(fetchCollectionStart());
        const collectionRef=firestore.collection('collections');
        collectionRef
            .get()
            .then(snapshot => {
                const collectionMap= convertCollectionSnaphotToMap(snapshot);
                dispatch(fetchCollectionSuccess(collectionMap));
            })
            .catch(err => {
                dispatch(fetchCollectionFailure(err.message))
            })
    }
}

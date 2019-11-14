import { shopActionTypes } from './shopActionTypes';

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: ''
}

const shopReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionTypes.FETCH_COLLECTION_START:
            return {
                ...state,
                isFetching: true,
            }
        case shopActionTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                collections: action.payload,
                isFetching: false,
            }
        case shopActionTypes.FETCH_COLLECTION_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isFetching: false,
            }
        default:
            return state
    }
}

export default shopReducer;
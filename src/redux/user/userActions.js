import userActionTypes from './userActionTypes'


export const signUpStart = newUser => ({
    type: userActionTypes.SIGN_UP_START,
    payload: newUser,
})

export const signUpSuccess = ({ user, additionalData}) => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData}
})

export const signUpFailure = (error) => ({
    type: userActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const signInWithGoogleStart = () => ({
    type: userActionTypes.SIGN_IN_WITH_GOOGLE_START,
});

export const signInWithEmailStart = emailAndPassword => ({
    type: userActionTypes.SIGN_IN_WITH_EMAIL_START,
    payload: emailAndPassword,
});


export const signInSuccess = user => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () => ({
    type: userActionTypes.CHECK_USER_SESSION,
})

export const signOut = () => ({
    type: userActionTypes.SIGN_OUT_START,
})

export const signOutSuccess = () => ({
    type: userActionTypes.SIGN_OUT_SUCCESS,
})

export const signOutFailure = (error) => ({
    type: userActionTypes.SIGN_OUT_FAILURE,
    payload: error,
})

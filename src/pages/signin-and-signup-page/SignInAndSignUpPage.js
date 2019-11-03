import React from 'react';
import SignIn from '../../components/sign-in/SignIn'
import SignUp from '../../components/sign-up/SignUp';
import './signin-and-signup.scss';

const SignInAndSignUpPage = () => (
    <div className='sign-in-sign-up'> 
        <SignIn />
        <SignUp />
    </div>
)

export default SignInAndSignUpPage;
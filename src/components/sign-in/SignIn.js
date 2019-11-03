import React, { Component } from 'react'
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { auth, signInWithGoogle } from '../../firebase/firebase-util';

import './sign-in.scss';

class SignIn extends Component {
    constructor(){
        super();
        this.state ={
            email: '',
            password: '',
        }
    }

    handleOnChange =(event) => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);
        } catch(error) {
            console.log('Error signin', error)
        }
    }

    render() {
        return (
            <div className='sign-in'>
                <h1 className='title'>Already have an account </h1>
                <span>Sign in using email and password </span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email'
                        type='email'
                        value={this.state.email}
                        required
                        handleChange={this.handleOnChange}
                        label='Email'
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        required
                        handleChange={this.handleOnChange}
                        label='Password'
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignin> Sign In With Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
import React, { Component } from 'react'
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { auth, createUserProfileDocument } from '../../firebase/firebase-util';

import './sign-up.scss';

class SignIn extends Component {
    constructor(){
        super();
        this.state ={
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
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
        const { displayName, email, password, confirmPassword } = this.state;
        if(password !== confirmPassword) {
            alert('Password do not match');
            return;
        } 
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            })
        } catch (error) {
            console.log('Error in sign up', error)
        }
        
    }

    render() {
        return (
            <div className='sign-up'>
                <h1 className='title'>I do not have an account </h1>
                <span>Sign up using email and password </span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='displayName'
                        type='text'
                        value={this.state.displayName}
                        required
                        handleChange={this.handleOnChange}
                        label='Display Name'
                    />
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
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={this.state.confirmPassword}
                        required
                        handleChange={this.handleOnChange}
                        label='Confirm Password'
                    />
                    <CustomButton type='submit'> Sign Up </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn;
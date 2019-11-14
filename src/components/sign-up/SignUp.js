import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { signUpStart } from '../../redux/user/userActions'

import './sign-up.scss';

class SignIn extends Component {
    constructor(){
        super();
        this.state ={
            displayName: 'evevev',
            email: 'a@ff.com',
            password: 'password',
            confirmPassword: 'password',
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
        const { signUpStart } = this.props;
        if(password !== confirmPassword) {
            alert('Password do not match');
            return;
        } 

        signUpStart({ email,password,displayName })
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

const mapDispatchToProps = dispatch => ({
    signUpStart: newUser => dispatch(signUpStart(newUser))
})
export default connect(null, mapDispatchToProps)(SignIn);
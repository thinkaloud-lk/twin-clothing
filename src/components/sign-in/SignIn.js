import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { auth } from '../../firebase/firebase-util';
import { signInWithGoogleStart,signInWithEmailStart } from '../../redux/user/userActions';
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

    handleSubmit = (event) => {
        const { signInWithEmailStart } = this.props;
        event.preventDefault();
        signInWithEmailStart(this.state)
    }

    render() {
        const { signInWithGoogleStart } = this.props;
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
                        <CustomButton type='button' onClick={signInWithGoogleStart} isGoogleSignin> Sign In With Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const matchDispatchToProps = dispatch => ({
    signInWithGoogleStart: () => dispatch(signInWithGoogleStart()),
    signInWithEmailStart: (emailAndPassword) => dispatch(signInWithEmailStart(emailAndPassword))
})

export default connect(null, matchDispatchToProps)(SignIn);
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shoppage/ShopPage';
import SignInAndSignUpPage from './pages/signin-and-signup-page/SignInAndSignUpPage';
import CheckoutPage from './pages/checkout-page/CheckoutPage'
import { checkUserSession } from './redux/user/userActions';
import { currentUserSelector } from './redux/user/userSelectors';
import Header from './components/header/Header';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession()
  }
  
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact
            path='/signin'
            render ={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} />
        </Switch>
      </div>
    );
  }
}

const matchStateToProps = createStructuredSelector({
  currentUser: currentUserSelector
})

const matchDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(matchStateToProps,matchDispatchToProps)(App);
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase-util'
import CartIcon from '../cart-icon/CartIcon';
import CartDropDown from '../cart-dropdown/CartDropDown';
import { signOut } from '../../redux/user/userActions'
import { currentUserSelector } from '../../redux/user/userSelectors';
import { cartHiddenSelector } from '../../redux/cart/cartSelectors';
import './header.scss'

const Header = ({ currentUser ,signOut, hidden}) => (
    <div className='header'>
        <Link to='/' className='logo-container '>
            <Logo /> 
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>Shop</Link>
            <Link to='/contact' className='option'>Contact</Link>
            {
                currentUser ? 
                    <Link onClick={signOut} className='option'>Sign Out</Link>
                :
                    <Link to='/signin' className='option'>Sign In</Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropDown />
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
    hidden: cartHiddenSelector
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
})
export default connect(mapStateToProps,mapDispatchToProps)(Header);
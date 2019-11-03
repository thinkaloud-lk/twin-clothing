import React from 'react';
import { connect } from 'react-redux';
import './cart-dropdown.scss';
import CartItem from '../cart-item/CartItem';

import CustomButton from '../custom-button/CustomButton';

const CartDropDown =({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(item => <CartItem item={item} />)
            }
        </div>
        <CustomButton>GO TO CHECKOUT </CustomButton>
    </div>
)

const mapStateToProps = ({ cart: { cartItems }}) => ({
    cartItems
});
export default connect(mapStateToProps)(CartDropDown);
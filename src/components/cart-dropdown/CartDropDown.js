import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import './cart-dropdown.scss';
import CartItem from '../cart-item/CartItem';
import { cartItemsSelector } from '../../redux/cart/cartSelectors';
import { toggleCartHidden } from '../../redux/cart/cartActions';

import CustomButton from '../custom-button/CustomButton';

const CartDropDown =({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ? 
                cartItems.map(item => <CartItem key={item.id} item={item} />)
                :
                <span className='empty-message'>Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
             history.push('/checkout');
             dispatch(toggleCartHidden())
            }
        }>
            GO TO CHECKOUT 
        </CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: cartItemsSelector
});
export default withRouter(connect(mapStateToProps)(CartDropDown));
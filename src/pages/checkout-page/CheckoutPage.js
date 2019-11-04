import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { cartItemsSelector, cartTotalSelector } from '../../redux/cart/cartSelectors';
import './checkout-page.scss';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';

const CheckoutPage = ({ cartItems, cartTotal }) =>  (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(item => <CheckoutItem key={item.id} item ={item} />)
            }
            <div className='total'>
                Total ${cartTotal}
            </div>
        </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: cartItemsSelector,
    cartTotal: cartTotalSelector,
})
export default connect(mapStateToProps)(CheckoutPage);
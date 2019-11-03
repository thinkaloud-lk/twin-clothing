import React from 'react';
import './cart-item.scss';

const CartItem =({ item : { name, price, imageUrl, qty} }) => (
    <div className='cart-item'>
        <img src={imageUrl} alt="item"/>
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>{qty} x ${price}</span>
        </div>
    </div>
)

export default CartItem;
import React from 'react';
import { connect } from 'react-redux';
import { addItem, clearItem, removeItem } from '../../redux/cart/cartActions';
import './checkout-item.scss';

const CheckoutItem = ({ item, item : { imageUrl, name, qty, price }, addItem, clearItem, removeItem }) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item'/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div onClick={() => removeItem(item)} className='arrow'>&#10094;</div>
                {qty}
            <div onClick={() => addItem(item)} className='arrow'>&#10095;</div>
        </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={() => clearItem(item)}>&#10005;</div>
    </div>
)

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    clearItem: item => dispatch(clearItem(item)),
    removeItem: item => dispatch(removeItem(item)),
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
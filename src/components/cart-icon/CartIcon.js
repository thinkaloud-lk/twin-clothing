import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cartActions';
import { getCartItemsCount } from '../../redux/cart/cartSelectors';
import './cart-icon.scss';

const CartIcon =({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={() => toggleCartHidden() }>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapStateToProps = (state) => ({
    itemCount: getCartItemsCount(state)
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);
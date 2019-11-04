import { createSelector } from 'reselect';

const cartSelector = state => state.cart;

export const cartItemsSelector = createSelector(
    [cartSelector],
    (cart) => cart.cartItems
)

export const getCartItemsCount = createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.reduce((acc,item ) => acc + item.qty, 0 )
)

export const cartHiddenSelector = createSelector(
    [cartSelector],
    (cart) => cart.hidden
) 

export const cartTotalSelector = createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.reduce((total,item) => total + item.price * item.qty,0 )
)
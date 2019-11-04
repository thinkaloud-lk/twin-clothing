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

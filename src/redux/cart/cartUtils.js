export const addItemToCart = ( cartItems, itemToAdd ) => {
    const existing = cartItems.find(cartItem => cartItem.id === itemToAdd.id);

    if(existing) {
        return cartItems.map(cartItem => 
            cartItem.id === itemToAdd.id 
            ? {...cartItem, qty: cartItem.qty+1}
            : cartItem
        )
    }

    return [...cartItems, {...itemToAdd, qty: 1}]
}

export const removeItemFromCart = ( cartItems, itemToRemove ) => {
    const existing = cartItems.find(cartItem => cartItem.id === itemToRemove.id);
    if(existing.qty === 1){
        return cartItems.filter(item => item.id !== itemToRemove.id)
    }
    return cartItems.map(cartItem => 
        cartItem.id === itemToRemove.id 
        ? {...cartItem, qty: cartItem.qty - 1}
        : cartItem
    )
}



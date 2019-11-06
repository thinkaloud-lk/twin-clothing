import React from 'react';
import StripCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableApiKey = 'pk_test_jHKRu6iJ1MeKTxsaUaMAaKEG00PBCIKD2'

    const onToken = token => {
        console.log(token)
        alert('Payment successfull')
    }
    return (
        <StripCheckout 
            label='Pay Now'
            name='Twin Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            stripeKey={publishableApiKey}
            token={onToken}
        />
    )

}

export default StripeCheckoutButton;
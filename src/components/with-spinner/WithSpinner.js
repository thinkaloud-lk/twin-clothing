import React from 'react';
import './with-spinner.scss';

const withSpinner = WrappedComponent => ({ loading, ...otherProps}) => (
    loading ? (
        <div className='spinnerOverlay'>
            <div className='spinnerContainer' />
        </div>
    ) : 
    <WrappedComponent {...otherProps} /> 
)

export default withSpinner;
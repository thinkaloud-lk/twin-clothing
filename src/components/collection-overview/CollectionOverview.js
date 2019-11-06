import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { collectionArraysSelector } from '../../redux/shop/shopSelector';

import CollectionPreview from '../../components/collection-preview/CollectionPreview';

 const ColectionOverview = ({ collections }) => (
    <div className='collection-overview'>
        {
            collections.map(({ id, ...restCollProps }) => (
                <CollectionPreview key={id} {...restCollProps} />
            ))
        }
    </div>
)
    


const mapStateToProps = createStructuredSelector({
    collections: collectionArraysSelector,
})

export default connect(mapStateToProps)(ColectionOverview);

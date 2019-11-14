import React from 'react'
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collection-overview/CollectionOverview';
import CollectionPage from '../collectionpage/CollectionPage';
import WithSpinner from '../../components/with-spinner/WithSpinner'

import { fetchCollectionStart } from '../../redux/shop/shopActions';
import { isFetchingSelector, isCollectionLoadedSelector } from '../../redux/shop/shopSelector';
const CollectionOverviewWithSpinner=WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

 class ShopPage extends React.Component {

   componentDidMount(){
     const { fetchCollectionStart } =this.props;
     fetchCollectionStart()
   }
    render(){
      const { match, isFetching,isCollectionLoadedSelector }=this.props;
      return (
         <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner loading={isFetching} {...props}/>} />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner loading={!isCollectionLoadedSelector} {...props}/>} />
         </div>
       )
    }
 } 

const mapStateToProps = createStructuredSelector({
   isFetching: isFetchingSelector,
   isCollectionLoadedSelector: isCollectionLoadedSelector,
})

const mapDispatchToProps = dispatch => ({
   fetchCollectionStart: () => dispatch(fetchCollectionStart())
})
    
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

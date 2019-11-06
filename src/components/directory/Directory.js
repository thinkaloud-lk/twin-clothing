import React from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { directorySectionsSelector } from '../../redux/directory/directorySelectors';
import MenuItem from '../menuitem/MenuItem';
import './directory.scss';

const  Directory = ({ sections }) => (
    <div className='directory-menu'>
        {
            sections.map(({ id, ...otherProps }) => (
              <MenuItem key={id} { ...otherProps } /> 
            ))
        }
    </div>
  )
    
const mapStateToProps = createStructuredSelector({
  sections: directorySectionsSelector
})
export default connect(mapStateToProps)(Directory);
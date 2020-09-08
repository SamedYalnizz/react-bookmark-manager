import React, { Component} from 'react';
import {NewBookmarkForm} from '../new-bookmark-form/new-bookmark-form.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import './bookmark-modal.style.css';

export const BookmarkModal = (props) => (
    <div className='modal-container'>
        <FontAwesomeIcon icon={faWindowClose} className="close-icon" onClick= {props.close}/>
        <div className="modal-header">
            <h3>Add New Bookmark</h3>
        </div>
        <div className="modal-content">
            <NewBookmarkForm close={props.close}/>
        </div>
    </div>
    
)

// Create Modal Header (Title & Close Icon)
// Need BookmarkForm



// header title, close button
//Form
    // Website Name
    // Website URL
    // Folder Name
    // Save Button

import React, { Component} from 'react';
import {NewBookmarkForm} from '../new-bookmark-form/new-bookmark-form.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import './bookmark-modal.style.css';

export const BookmarkModal = () => (
    <div className='modal-container'>
        <FontAwesomeIcon icon={faWindowClose} className="close-icon"/>
        <div className="modal-header">
            <h3>Add New Bookmark</h3>
            
        </div>
        <div className="modal-content">
            <NewBookmarkForm />
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

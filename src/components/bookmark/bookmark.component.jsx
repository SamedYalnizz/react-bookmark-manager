import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose , faEdit} from '@fortawesome/free-solid-svg-icons';

import './bookmark.style.css';

export class Bookmark extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookmarks: props.folder.bookmarks
        }
    }

    render(){
        return (
            <li className="bookmark-item">
                 <FontAwesomeIcon icon={faWindowClose} className="bookmark-delete-icon" 
                onClick={() => {this.props.deleteBookmark(this.props.bookmarkIndex)}}
                />
                <FontAwesomeIcon icon={faEdit} className="edit-icon"
                onClick={() => {
                    this.props.showBookmarkModal(this.props.folders.findIndex((element) => element === this.props.folder), this.props.bookmarkIndex, this.props.folder.bookmarks[this.props.bookmarkIndex].name, this.props.folder.bookmarks[this.props.bookmarkIndex].url)
                    }}
                />
                <a href={this.props.folder.bookmarks[this.props.bookmarkIndex].url} 
                target='_blank'>
                {this.props.folder.bookmarks[this.props.bookmarkIndex].name}
                </a>
                {this.props.children}
            </li>
        )
    }
}
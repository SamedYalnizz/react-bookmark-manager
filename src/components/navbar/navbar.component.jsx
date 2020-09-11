import React, {Component} from 'react';
import {Modal} from '../modal/modal';
import {BookmarkModal} from '../bookmark-modal/bookmark-modal.component';
import {FolderModal} from '../folder-modal/folder-modal.component';

import './navbar.style.css';

export class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            showBookmarkModal: false,
            showFolderModal: false
        }
        
    }
    
    showBookmarkModal = () => {
        this.setState({showBookmarkModal: true});
    }
    hideBookmarkModal = () => {
        this.setState({showBookmarkModal: false})
    }
    showFolderModal = () => {
        this.setState({showFolderModal: true});
    }
    hideFolderModal = () => {
        this.setState({showFolderModal: false})
    }

    render() {
        return (
            <div className="navbar">
                <button type="button" onClick={this.showBookmarkModal} className="button">+ Bookmark</button>
                <Modal show={this.state.showBookmarkModal} >
                    <BookmarkModal close={this.hideBookmarkModal} addBookmark={this.props.addBookmark} close={this.hideBookmarkModal} folders={this.props.folders}/>
                </Modal> 
                <button type="button" onClick={this.showFolderModal} className="button">+ Folder</button>
                <Modal show={this.state.showFolderModal}>
                    <FolderModal close={this.hideFolderModal} addFolder={this.props.addFolder} folders={this.props.folders} />
                </Modal>
            </div>
        )
    }
        
}
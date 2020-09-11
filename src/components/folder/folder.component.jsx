import React from 'react';
import {BookmarkList} from '../bookmark-list/bookmark-list.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import ContentEditable from "react-contenteditable";
import {Modal} from '../modal/modal';
import {BookmarkModal} from '../bookmark-modal/bookmark-modal.component';

import './folder.style.css';

export class Folder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            folderTitle: props.folders[props.folder].name,
            beforeHtml: "<h2 className='folder-title'>",
            afterHtml: "</h2>",
            tempFolderTitle: props.folders[props.folder].name,
            showBookmarkModal: false
        }
        this.deleteBookmark = this.deleteBookmark.bind(this);
        this.editBookmark = this.editBookmark.bind(this);
    }
    handleFolderNameChange = (event) => {
        let newTitle = event.target.value;
        let titleArray = newTitle.split('>');
        let newTitleArray = titleArray[1].split('<');
        this.setState({tempFolderTitle: newTitleArray[0]});
        console.log(this.state.tempFolderTitle);
    };

    updateFolder = () => {
        if(this.state.tempFolderTitle != "" && this.state.tempFolderTitle !== this.state.folderTitle){
            // this is not being done on time 
            this.setState({folderTitle: this.state.tempFolderTitle}, () => {
                console.log(this.state.folderTitle);
                let folder = this.props.folders[this.props.folder];
                folder.name = this.state.folderTitle;
                console.log(folder);
                this.props.updateFolder(folder, this.props.folder);
            }        
        )}
        else if(this.state.tempFolderTitle == ""){
            this.props.deleteFolder(this.props.folder);
        }
    };

    deleteBookmark(bookmarkIndex){
        let newFolder = JSON.parse(JSON.stringify(this.props.folders[this.props.folder]));
        console.log(newFolder, bookmarkIndex);
        newFolder.bookmarks.splice(bookmarkIndex, 1);
        let newFolders = [...this.props.folders];
        newFolders[this.props.folder] = newFolder;
        this.props.updateFolder(newFolder, this.props.folder);
    }

    editBookmark(bookmarkIndex){
        console.log("Hello Edit Bookmark");
        // Open Bookmark Modal with Values inserted
        // When clicking on save: updates the bookmark with the given index
            // Open bookmark modal
            /*
           

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
        
}*/

    }

    render(){
        return (
        <div className="folder-container">
             <FontAwesomeIcon icon={faWindowClose} className="close-icon" 
            onClick={() => {this.props.deleteFolder(this.props.folder)}}
            />
            <div className="folder-header">
            <ContentEditable 
                html={this.state.beforeHtml + this.state.tempFolderTitle + this.state.afterHtml}
                disabled={false}
                onChange={this.handleFolderNameChange}
                onBlur={this.updateFolder}

            />

    
            </div>
            <BookmarkList folder={this.props.folders[this.props.folder]} folders={this.props.folders} deleteBookmark={this.deleteBookmark} editBookmark={this.editBookmark}/>
        </div>
        )
    }
}


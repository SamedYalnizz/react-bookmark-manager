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
            tempFolderTitle: props.folders[props.folder].name
        }
        this.deleteBookmark = this.deleteBookmark.bind(this);
        this.updateBookmark = this.updateBookmark.bind(this);
        this.updateBookmarkList = this.updateBookmarkList.bind(this);
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

    updateBookmark(oldFolderIndex, oldBookmarkIndex, newBookmarkName, newBookmarkUrl){
        let newFolder = JSON.parse(JSON.stringify(this.props.folders[this.props.folder]));
        let newBookmark = {
            name: newBookmarkName,
            url: newBookmarkUrl
        }
        newFolder.bookmarks.splice(oldBookmarkIndex, 1, newBookmark);
        let newFolders = [...this.props.folders];
        newFolders[this.props.folder] = newFolder;
        this.props.updateFolder(newFolder, this.props.folder);        
    }

    updateBookmarkList(bookmarkList, oldFolderIndex, newFolderIndex){
        let newFolder = JSON.parse(JSON.stringify(this.props.folders[this.props.folder]));
        let newBookmarkList = JSON.parse(JSON.stringify(bookmarkList));
        newFolder.bookmarks = newBookmarkList;
        this.props.updateFolder(newFolder, this.props.folder);
    }

    /*updateFolderList = (newList) => {
    let newFolders = [...newList];
    this.setState({folders: newFolders});
  }*/

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

            <BookmarkList 
            folder={this.props.folders[this.props.folder]} 
            folders={this.props.folders} 
            deleteBookmark={this.deleteBookmark} 
            updateBookmark={this.updateBookmark}
            updateBookmarkList={this.updateBookmarkList}

            />
        </div>
        )
    }
}


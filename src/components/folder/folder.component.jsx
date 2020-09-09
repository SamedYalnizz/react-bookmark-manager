import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import ContentEditable from "react-contenteditable";

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
            <ul className="bookmark-list">
            {this.props.folders[this.props.folder].bookmarks.map((bookmark,index) => (
                <li className="bookmark-item" key={index}>
                <a href={bookmark.url} target='_blank'> {bookmark.name}</a>
                </li>
            ))}
            </ul>
        </div>
        )
    }
}


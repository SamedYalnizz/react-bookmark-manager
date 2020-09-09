import React from 'react';
import { Folder } from '../folder/folder.component';
import './folder-list.style.css';

export const FolderList = (props) =>{
    return (
        <div className="folder-list">
            {props.folders.map((folder, index) =>(
                <Folder key={index} folder={index} folders={props.folders} deleteFolder={props.deleteFolder} updateFolder={props.updateFolder}/>
            ))}
        </div>
    )
}
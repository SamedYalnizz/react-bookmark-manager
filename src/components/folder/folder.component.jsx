import React from 'react';
import './folder.style.css';

export const Folder = (props) =>{
    return(
        <div className="folder-container">
            <div className="folder-header">
                <h2>{props.folder.name}</h2>
            </div>
            <ul className="bookmark-list">
            {props.folder.bookmarks.map((bookmark,index) => (
                <li className="bookmark-item" key={index}> { bookmark }</li>
            ))}
            </ul>
        </div>
    )
}
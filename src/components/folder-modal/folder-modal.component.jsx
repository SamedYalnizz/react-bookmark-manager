import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import './folder-modal.style.css';


export class FolderModal extends React.Component{
    constructor(){
        super();

        this.state = {
            folderName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }
    handleChange(event){
        this.setState({folderName: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        const newFolder = {
            name: this.state.folderName,
            bookmarks: []
        }
        this.props.addFolder(newFolder);
        this.props.close();
    }

    render(){
        return(
            <div className='modal-container'>
                <FontAwesomeIcon icon={faWindowClose} className="close-icon" onClick= {this.props.close}/>
                <div className="modal-header">
                    <h3>Add New Folder</h3>
                </div>
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit} >
                        <label className="form-label">
                            Folder Name: 
                            <input type="text" value={this.state.folderName} onChange={this.handleChange} placeholder="Folder Name" className="form-input"/>
                        </label>
                        <input type="submit" value="Save" className="save-btn"  />
                    </form>
                </div>
            </div>


        )
    }
}
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import './folder-modal.style.css';


export class FolderModal extends React.Component{
    constructor(){
        super();
        this.state = {
            folderName: '',
            touched: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    canBeSubmitted(){
        return(
            this.state.folderName !== '' && !this.folderNameExists()
        )
    }

    handleChange(event){
        this.setState({folderName: event.target.value});
    }

    handleBlur = () => {
        this.setState({touched: true});
        console.log(this.state.touched);
    }

    handleSubmit(event){
        if(!this.canBeSubmitted()){
            event.prevenDefault();
            return;
        }
        event.preventDefault();
        const newFolder = {
            name: this.state.folderName,
            bookmarks: [],
            
        }
        this.props.addFolder(newFolder);
        this.props.close();
    }
    folderNameExists(){
        let oldFolders = this.props.folders.map((folder, index)=> {
            if(this.state.folderName == folder.name){
                return true;
            } 
        })
        if(oldFolders.includes(true)){
            return true;
        }
        else {
            return false;
        }
    }

    isInvalid(){
        if((this.state.touched == true && this.state.folderName == "") || this.folderNameExists()){
            return true;
        } else {
            return false;
        }
    }

    createErrorMessage(){
        if(this.state.touched == true && this.state.folderName ==""){
            return "Please insert a folder name."
        } else if(this.folderNameExists()){
            return "There is already a folder with this name."
        } else {
            return null
        }
    }

    render(){
        const isEnabled = this.canBeSubmitted();
        console.log("FolderName Exists :",this.folderNameExists());

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
                            <input 
                            type="text" 
                            value={this.state.folderName} 
                            onChange={this.handleChange} 
                            placeholder="Folder Name" 
                            className={this.isInvalid() ? "form-input error" : "form-input"}
                            onBlur={this.handleBlur}    
                            />
                        </label>
                        <input disabled={!isEnabled} type="submit" value="Save" className="save-btn"  />
                        <p
                        className="error-text"
                        >
                        {this.createErrorMessage()}
                        </p>
                    </form>
                </div>
            </div>


        )
    }
}
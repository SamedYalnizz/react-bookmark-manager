import React, { Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose, faAssistiveListeningSystems} from '@fortawesome/free-solid-svg-icons';
import './bookmark-modal.style.css';

export class BookmarkModal extends React.Component{
    constructor() {
        super();
        this.state = {
            websiteName: '',
            websiteUrl: '',
            folderSelection: '',
            
            touched: {
                websiteName: false,
                websiteUrl: false,
            }
        }
        this.handleWebsiteNameChange = this.handleWebsiteNameChange.bind(this);
        this.handleWebsiteUrlChange = this.handleWebsiteUrlChange.bind(this);
        this.handleFolderSelectionChange = this.handleFolderSelectionChange.bind(this);
        this.validateInput = this.validateInput.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this); 
    };

    handleWebsiteNameChange(event){
        this.setState({websiteName: event.target.value})
    };
    handleWebsiteUrlChange(event){
        this.setState({websiteUrl: event.target.value})
    };
    handleFolderSelectionChange(event){
        console.log(event.target.value);
        this.setState({folderSelection: event.target.value})
    };

    handleBlur = (field) => (event) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
        console.log(this.state.touched);
    };

    validateInput(websiteName, websiteUrl){
        return {
            websiteName: websiteName.length === 0,
            websiteUrl: websiteUrl.length === 0
        }
    }
    canBeSubmitted() {
        const errors = this.validateInput(
          this.state.websiteName,
          this.state.websiteUrl,
        );
        if (errors.websiteName === true || errors.websiteUrl === true){
            return false;
        }
        else {
            return true; 
        }
    }


    handleSubmit(event){
        if(!this.canBeSubmitted()){
            event.preventDefault();
            return; 
        }
        const newBookmark = {
            name: this.state.websiteName,
            url: this.state.websiteUrl,
        }
        this.props.addBookmark(newBookmark, this.state.folderSelection);
        this.props.close();
    }

    render(){
        const errors = this.validateInput(
            this.state.websiteName,
            this.state.websiteUrl
          );
          const isDisabled = Object.keys(errors).some(x => errors[x]);
          const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
          };
        return (
            <div className='modal-container'>
                <FontAwesomeIcon icon={faWindowClose} className="close-icon" onClick= {this.props.close}/>
                <div className="modal-header">
                    <h3>Add New Bookmark</h3>
                </div>
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit}>
                        <label className="form-label">
                            Website Name:
                            <input type="text" 
                            value={this.state.websiteName} 
                            onChange={this.handleWebsiteNameChange} 
                            placeholder="Website Name" 
                            className="form-input"
                            className={shouldMarkError("websiteName") ? "form-input error" : "form-input"}
                            onBlur={this.handleBlur('websiteName')}    
                            />
                        </label>
                        <label>
                            Website URL:
                            <input type="text" name="url" id="url" placeholder="https://example.com"  
                            className={shouldMarkError("websiteUrl") ? "form-input error" : "form-input"}
                            onChange={this.handleWebsiteUrlChange} value={this.state.websiteUrl} onBlur={this.handleBlur('websiteUrl')} 

                            />
                        </label>
                        <label>
                            Folder:
                            <select className="form-input" name="folders" id="folder-selection" onChange={this.handleFolderSelectionChange}>
                                <option value="0">To Read </option>
                                <option value="1">News</option>
                                <option value="2">Coding</option>
                                <option value="3">Personal</option>
                            </select>
                        </label>
                        <button type="submit" value="Save" className="save-btn" disabled={isDisabled}/>
                    </form>
                </div>
        </div>
        )
    }
}
   

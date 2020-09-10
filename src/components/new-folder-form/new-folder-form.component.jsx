import React from 'react';
import './new-folder-form.style.css';

export class NewFolderForm extends React.Component{
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

    canBeSubmitted(){
        return (
            this.state.folderName > 0
        )
    }

    handleSubmit(event){
        event.preventDefault();
        const newFolder = {
            name: this.state.folderName,
            bookmarks: [],
            id: this.state.folderName
        }
        const oldFolders = this.props.folders;
        oldFolders.push(newFolder);
        console.log(oldFolders);
        this.props.addFolder(oldFolders);
    }
    isEnabled(){
        if(this.state.folderName !== ''){
            return true;
        } else {
            return false;
        }
    }


    render(){
        console.log("hello")
        this.isEnabled()
        console.log(this.isEnabled());
        return(
            <form onSubmit={this.handleSubmit} >
                <label className="form-label">
                    Folder Name: 
                    <input type="text" value={this.state.folderName} onChange={this.handleChange} placeholder="Folder Name" className="form-input"/>
                </label>
                <button disabled={!this.isEnabled}type="submit" value="Save" className="save-btn" />
            </form>
        )
    }
}
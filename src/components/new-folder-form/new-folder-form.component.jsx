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

    handleSubmit(event){
        event.preventDefault();
        const newFolder = {
            name: this.state.folderName,
            bookmarks: []
        }
        const oldFolders = this.props.folders;
        oldFolders.push(newFolder);
        console.log(oldFolders);
        this.props.addFolder(oldFolders);
        
    }


    render(){
        return(
            <form onSubmit={this.handleSubmit} >
                <label className="form-label">
                    Folder Name: 
                    <input type="text" value={this.state.folderName} onChange={this.handleChange} placeholder="Folder Name" className="form-input"/>
                </label>
                <input type="submit" value="Save" className="save-btn"  />
            </form>
        )
    }
}
import React from 'react';
import { Folder } from '../folder/folder.component';
import { ReactSortable } from "react-sortablejs";
import './folder-list.style.css';

export class FolderList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            folders: props.folders
        }
    }
    componentDidMount(){
        this.setState({folders: [...this.props.folders]});
    }
    render(){
        

    return (
        <ReactSortable  className="folder-list"
        list={this.props.folders}
        setList={newState => {
            this.setState({folders: newState})
            let newList = [...this.state.folders];
            // bis hierhin klappt es gut. updateFolderList klappt nicht. 
            this.props.updateFolderList(newList);
            }}
         >
            {this.props.folders.map((item,index) => (
                <Folder key={item.id} folder={index} folders={this.props.folders} deleteFolder={this.props.deleteFolder} updateFolder={this.props.updateFolder}/>
            ))}  
        
        </ReactSortable>
    )}
}


/* <div className="folder-list">
{props.folders.map((folder, index) =>(
))}
</div> */
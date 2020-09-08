import React from 'react';
import {NavBar} from './components/navbar/navbar.component';
import {FolderList} from './components/folder-list/folder-list.component';


import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      folders: [
        {
          name: "Folder 1",
          bookmarks: ["bookmark1", "bookmark2", "bookmark3"]
        },
        {
          name: "Folder 2",
          bookmarks: ["bookmark1", "bookmark2", "bookmark3"]
        }
      ]
    }
    this.addFolder = this.addFolder.bind(this);
  }
  showState(){
    console.log(this.state.folders);
  }
  
  addFolder(folder){
    this.setState({folders: folder});
    console.log(this.state.folders);
  }

  render(){
    return (
      <div className="App">
        <NavBar addFolder={this.addFolder} folders={this.state.folders}/>
        <FolderList folders={this.state.folders}/>
      </div>
      
    );
  }
  
}

export default App;

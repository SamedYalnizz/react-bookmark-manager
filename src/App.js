import React from 'react';
import {NavBar} from './components/navbar/navbar.component';
import {FolderList} from './components/folder-list/folder-list.component';


import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      folders: []
    }
  }
  componentDidMount() {
    if(window.localStorage.getItem('Folders')){
      let folders = JSON.parse(localStorage.getItem('Folders'));
      this.setState({folders: folders},() => console.log(this.state.folders));
    } 
    else {
        let bookmark1 = {
            name: "Google",
            url: "www.google.de"
        }
        let bookmark2 = {
            name: "github",
            url: "www.github.com"
        }
        let bookmark3 = {
            name: "bloomberg",
            url: "www.bloomberg.com"
        }
        let bookmark4 = {
            name: "FT",
            url: "www.ft.com"
        }
        let folder1 = {
            name: 'To Read',
            bookmarks: [bookmark1, bookmark2],
            id: 1
        }
        let folder2 = {
            name: 'Coding',
            bookmarks: [bookmark3],
            id: 2
        }
        let folder3 = {
            name: 'News',
            bookmarks: [bookmark4],
            id: 3
        }
        let folder4 = {
            name: 'Personal',
            bookmarks: [],
            id: 4
        }
        let folders = [ folder1 , folder2 , folder3 , folder4];
     localStorage.setItem('Folders', JSON.stringify(folders));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.folders !== this.state.folders){
      localStorage.setItem('Folders', JSON.stringify(this.state.folders));
    }
  }

  addBookmark = (bookmark, folderIndex) => {
    let selectedFolder = this.state.folders.find((folder, index) => index == folderIndex);
    selectedFolder.bookmarks.push(bookmark);
    let allFolders = [...this.state.folders];
    allFolders.splice(folderIndex, 1, selectedFolder);
    this.setState({folders: allFolders})
  }

  addFolder = (folder) => {
    this.setState({folders: this.state.folders.concat(folder)});
  }

  deleteFolder = (folderIndex) => {
    this.setState({folders: this.state.folders.filter((folder,index) => index !== folderIndex)});
  }

  updateFolder = (folder, folderIndex) => {
    let newFolder = folder;
    let newFolders = [...this.state.folders];
    newFolders[folderIndex] = newFolder;
    this.setState({folders: newFolders});  
  }

  updateFolderList = (newList) => {
    let newFolders = [...newList];
    this.setState({folders: newFolders});
  }

  render(){
    return (
      <div className="App">
        <NavBar addFolder={this.addFolder} folders={this.state.folders} addBookmark={this.addBookmark}/>
        <FolderList folders={this.state.folders} deleteFolder={this.deleteFolder} updateFolder={this.updateFolder} updateFolderList={this.updateFolderList}/>
      </div>
    );
  }
  
}

export default App;

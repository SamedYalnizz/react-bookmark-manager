import React from 'react';
import { Bookmark } from '../bookmark/bookmark.component';
import { ReactSortable } from "react-sortablejs";
import { Modal } from '../modal/modal';
import {BookmarkModal} from '../bookmark-modal/bookmark-modal.component';
import './bookmark-list.style.css';

export class BookmarkList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookmarks: "",
            showBookmarkModal: false, 
            editFolderIndex: "",
            editBookmarkIndex: "",
            editWebsiteName: "",
            editWebsiteUrl: ""
        }
        this.showBookmarkModal = this.showBookmarkModal.bind(this);
    }

    showBookmarkModal(folderIndex, bookmarkIndex, websiteName, websiteUrl){
        this.setState({editFolderIndex: folderIndex});
        this.setState({editBookmarkIndex: bookmarkIndex});
        this.setState({editWebsiteName: websiteName});
        this.setState({editWebsiteUrl: websiteUrl})
        this.setState({showBookmarkModal: true});
    }
    hideBookmarkModal = () => {
        this.setState({showBookmarkModal: false})
    }

    componentDidMount(){
        this.setState({bookmarks: [...this.props.folder.bookmarks]});
    }

    render(){
        return (
            <ReactSortable className="bookmark-list" tag='ul' 
            group="groupName"
            list={this.props.folder.bookmarks}
            setList={newState => {
                this.setState({bookmarks: newState})
                let newBookmarkList = [...this.state.bookmarks];
                if(this.state.bookmarks.length !== 0){
                    this.props.updateBookmarkList(newBookmarkList, this.props.folderIndex);
                }
            }}
            >
                {
                    this.props.folder.bookmarks.map((bookmark, index) =>(    
                        <Bookmark key={bookmark.id} 
                            folders={this.props.folders} 
                            folder={this.props.folder}
                            bookmarkIndex={index} 
                            bookmark={bookmark} 
                            deleteBookmark={this.props.deleteBookmark}
                            showBookmarkModal={this.showBookmarkModal}
                            >
                                <Modal show={this.state.showBookmarkModal} >
                                    <BookmarkModal 
                                    close={this.hideBookmarkModal} 
                                    addBookmark={this.props.addBookmark} 
                                    folders={this.props.folders} 
                                    showBookmarkModal={this.showBookmarkModal}
                                    folderIndex={this.state.editFolderIndex}
                                    bookmarkIndex={this.state.editBookmarkIndex}
                                    websiteName={this.state.editWebsiteName}
                                    websiteUrl={this.state.editWebsiteUrl}
                                    deleteBookmark={this.props.deleteBookmark}
                                    updateBookmark={this.props.updateBookmark}
                                    />
                                </Modal>
                        </Bookmark>
                        )
                )}
            </ReactSortable>
         )
    
    }
}


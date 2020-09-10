import React from 'react';
import './new-bookmark-form.style.css';

export class NewBookmarkForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            websiteName: '',
            websiteUrl: '',
            folderSelection: ''
        }
    }

    render(){
        return(
            <form onSubmit="">
                <label className="form-label">
                    Website Name:
                    <input type="text" value="" onChange="" placeholder="Website Name" className="form-input"/>
                </label>
                <label>
                    Website URL:
                    <input type="url" name="url" id="url" placeholder="https://example.com" pattern="https://.*" required className="form-input"/>
                </label>
                <input type="submit" value="Save" className="save-btn"/>
            </form>
        )
    }
}
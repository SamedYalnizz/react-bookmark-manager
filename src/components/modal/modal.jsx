import React, {Component} from 'react';
import './modal.style.css';

export class Modal extends Component{
    render() {
        if(!this.props.show){
           return null;
        } 
        return (
                <div className="modal">{this.props.children}</div>
            )    
        
    }   
}
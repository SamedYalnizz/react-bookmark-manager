import React from 'react';

import './dark-light-mode-switch.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {faMoon} from '@fortawesome/free-solid-svg-icons';


export class DarkLightModeSwitch extends React.Component{
    constructor(){
        super();
        this.state = {
           darkMode: false,
           hasThemeLoaded: false,
           currentTheme: 'light'
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.setToggleText = this.setToggleText.bind(this);
    }

    componentWillMount(){
        if(localStorage.getItem('dark')){
            let localDarkMode = localStorage.getItem('dark');
            this.setState({darkMode: localDarkMode});
            console.log("Local",localDarkMode);
        }
    }

    componentDidMount(){
        if(this.state.darkMode){
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    componentDidUpdate(){
        if(this.state.darkMode){
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }


    handleChange(){
        this.setState({darkMode: !this.state.darkMode}, () => localStorage.setItem('dark', this.state.darkMode));
        if(this.state.darkMode){
            this.setState({currentTheme: 'dark'});
        }
        else {
            this.setState({currentTheme: 'light'})
        }

    }

    setToggleText(){
        if(this.state.darkMode){
            return "Dark Mode"
        } else {
            return "Light Mode"
        }
    }

    
    render(){
        console.log(this.state.darkMode);

        return (
        <div className="theme-switch-wrapper">
            <span id="toggle-icon">
                <span className="toggle-text">{this.state.darkMode ? "Dark Mode" : "Light Mode"}</span>
                <FontAwesomeIcon icon={this.state.darkMode ? faMoon : faSun}/>
            </span>
            <label className="theme-switch">
                <input type="checkbox" defaultChecked={this.state.darkMode} onChange={this.handleChange}/>
                <div className="slider round"></div>
            </label>
        </div>
        )
    }
}
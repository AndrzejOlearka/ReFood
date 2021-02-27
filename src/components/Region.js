import React, { Component } from 'react'
import './Main.css';
import { locationHelper } from "../helpers/helpers"
import { regionsData } from '../data/regionsData.js';
import Navbar from "./header/Navbar.js"
import Footer from "./footer/Footer.js"
import MainSlider from './content/MainSlider';

export default class Region extends Component{
    
    constructor(props) {
        super(props);
        this.header = this.props.region.charAt(0).toUpperCase() +  this.props.region.slice(1)
    }

    render(){

        const props = this.props

        this.props.region ? this.region = this.props.region : this.region = locationHelper(this.props.location, this.context.userData.user.region);

        return (
            <>
                <Navbar {...props} />
                    <div className="App" style={{background: regionsData[this.props.region].colors.main_content}}>
                        <header className="App-header">
                            <h1 className="logo">ReFood</h1>
                            <h2 className="h2">Explore the food from... {this.header}</h2>
                        </header>
                        <MainSlider {...props} />
                    </div>
                <Footer {...props} />
            </>
        )
    }
}

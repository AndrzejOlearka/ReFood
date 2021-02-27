import React, { useContext, Component } from 'react'
import './Navbar.css';
import UserContext from "../../context/UserContext"
import Login from "../auth/LoginForm"
import Logout from "../auth/LogoutForm"
import { locationHelper } from "../../helpers/helpers"
import { regionsData } from '../../data/regionsData.js';

export default class Navbar extends Component{

    static contextType = UserContext;

    constructor(props) {
        super(props);
    }

    render(){

        this.context.userData.user.region ?  this.region = this.context.userData.user.region : this.region = 'home'
        this.props.region ? this.region = this.props.region : this.region = locationHelper(this.props.location, this.region)
        
        return (
            <nav className="navbar" style={{background: regionsData[this.region].colors.nav_footer}}>
                <div className="flex-items">
                    {this.context.userData.user.username ? (
                        <Logout/>
                    ) : (
                        <Login/>
                    )}
                </div>
            </nav>
        )
    }
}

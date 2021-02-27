import React, { useContext, Component } from 'react'
import UserContext from "../../context/UserContext"

export default class Navbar extends Component{

    static contextType = UserContext;

    onLogout()
    {
        localStorage.clear();
        window.location.reload();
    }

    onLogout()
    {
        window.location.href = '/panel';
    }
  
    render(){
  
        return (
            <section>
                <b>Hi, {this.context.userData.user.username}</b>
                <button onClick={this.onLogout} className="loginButton" type="button">Log Out</button>
                <button onClick={this.onLogout} className="loginButton" type="button">User Panel</button>
            </section>
        )
    }
}

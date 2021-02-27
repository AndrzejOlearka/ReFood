import React, { Component } from 'react';
import '../../components/Main.css';
import UserContext from "../../context/UserContext"
import axios from 'axios'

export default class LoginForm extends Component {

  static contextType = UserContext

  constructor(props) {
    super(props);

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
    this.state = {
      password: '',
      username: ''
    };
  }

  setUsername(e){
    this.setState({
      username: e.target.value
    })
    console.log(e.target.value)
  }

  setPassword(e){
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e)
  {
    e.preventDefault()
    
    const credentials = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post("http://localhost:5000/login", credentials).then(response => {
      console.log(response);
      this.context.setUserData({
        token: response.data.token,
        user: response.data.user
      })
      localStorage.setItem("auth-token", response.data.token)
    }).catch(error => {
      console.log(error.response.data);
    })
  }

  render(){

      return (
          <form onSubmit={this.onSubmit}>
            <label className="flex" htmlFor="login">
                Login:
            </label> 
            <input className="flex" type="text" id="login" value={this.state.username} onChange={this.setUsername}/>
            <label className="flex" htmlFor="login">
                Password:
            </label> 
            <input className="flex" type="text" id="login" value={this.state.password} onChange={this.setPassword}/>
            <button className="loginButton" type="submit">Log In</button>
          </form>
      )
    }
  }


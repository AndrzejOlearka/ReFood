import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../../components/Main.css';
import UserContext from "../../context/UserContext"
import axios from 'axios'
import Navbar from "../header/Navbar.js"
import Footer from "../footer/Footer.js"

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.setEmail = this.setEmail.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setPasswordConfirm = this.setPasswordConfirm.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      region: ''
    };
  }

  setUsername(e){
    this.setState({
      username: e.target.value
    })
    console.log(e.target.value)
  }

  setEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  setPassword(e){
    this.setState({
      password: e.target.value
    })
  }

  setPasswordConfirm(e){
    this.setState({
      passwordConfirm: e.target.value
    })
  }

  setRegion(e){
    this.setState({
      region: e.target.value
    })
  }
  static context = UserContext;

  onSubmit(e)
  {
    e.preventDefault()
    
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      region: this.state.region
    }
    axios.post("http://localhost:5000/register", user).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error.response.data);
    })
  }

  render(){
    const props = this.props
      return (
        <>
        <Navbar {...props} />
        <div className="container" style={{paddingTop: "100px"}}>
          <form onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="username" value={this.state.username} onChange={this.setUsername}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="email" value={this.state.email} onChange={this.setEmail}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="password" value={this.state.password} onChange={this.setPassword}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="confirm password" value={this.state.passwordConfirm} onChange={this.setPasswordConfirm}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="region" value={this.state.region} onChange={this.setRegion}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="submit" value="Register"/>
            </Grid>
          </form>
        </div>
        <Footer {...props} />
        </>
      )
    }
  }

/**
 * 
 * const TextFieldd = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: '0px solid',
    borderRadius: '5px'
  },
  fieldset:{
    fontSize: '35px'
  }
})(TextField);


class RegisterForm extends Component {

  render(){
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{paddingTop: '100px'}}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form  noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldd
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldd
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Password"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
}



 * 
 */

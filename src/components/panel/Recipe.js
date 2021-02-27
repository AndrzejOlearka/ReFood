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

export default class Recipe extends Component {

  constructor(props) {
    super(props);

    this.setName = this.setName.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.setIngridients = this.setIngridients.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setImage = this.setImage.bind(this);
   
    this.state = {
      name: '',
      region: '',
      ingridients: '',
      image: ''
    };
  }

  static contextType = UserContext;

  setName(e){
    this.setState({
      name: e.target.value
    })
  }

  setRegion(e){
    this.setState({
      region: e.target.value
    })
  }

  setIngridients(e){
    this.setState({
      ingridients: e.target.value
    })
  }

  setImage(e){
    this.setState({
      image: e.target.files[0]
    })
  }

  onSubmit(e)
  {
    e.preventDefault()
    let ingridients = this.state.ingridients.split(' ').join('');
    ingridients = ingridients.split(',');

    const recipe = {
      name: this.state.name,
      region: this.state.region,
      ingridients: ingridients,
      user: this.context.userData.user.id,
      //image: this.state.image
    }

    axios.post(
      "http://localhost:5000/panel/recipe/add",
      recipe,
      {headers: {"x-auth-token": this.context.userData.token}}).
    then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error.response.data);
    })

  }

  render(){
      return (
        <div className="container" style={{paddingTop: "100px"}}>
          <form onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="name" value={this.state.name} onChange={this.setName}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="region" value={this.state.region} onChange={this.setRegion}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="text" placeholder="ingridients" value={this.state.ingridients} onChange={this.setIngridients}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="file" name="image" onChange={this.setImage}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}></Grid>
              <input type="submit" value="Add Recipe"/>
            </Grid>
          </form>
        </div>
      )
    }
  }
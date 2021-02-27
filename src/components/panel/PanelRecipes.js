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
import Box from '@material-ui/core/Box';
import { regionsData } from '../../data/regionsData.js';
import Stars from "../stars/Stars";

export default class PanelRecipes extends Component {
    
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            userRates: [],
            rates: []
        };
    }

  componentDidMount(){

    axios.get("http://localhost:5000/panel/recipes/user/"+this.context.userData.user.id+"/all", null
    ).then(response => {
        this.setState({
            recipes: response.data.recipes,
            userRates: response.data.userRates
        })
    }).catch(error => {
        console.log(error);
    })

    axios.get("http://localhost:5000/panel/recipes/user/"+this.context.userData.user.id+"/rates", null
    ).then(response => {
        this.setState({
            rates: response.data
        })
    }).catch(error => {
        console.log(error);
    })
}

  render(){

      return (
        <article>
            {this.state.recipes ? (
                this.state.recipes.map((recipe, i) => { 
                    console.log(recipe);                  
                    return(
                        <div px={4} className="panelGridBox panelSecondaryBox">
                            <div style={{background: regionsData[recipe.region].colors.nav_footer}} className="panelTitle">
                                {recipe.name}
                            </div>
                            <Stars rate={this.state.avgRate} rate={this.state.userRates[recipe._id]} noHeader={true}/>
                        </div>
                    )
                })
            ) : (
                <p>Loading...</p>
            )}
        </article>
      )
    }
  }
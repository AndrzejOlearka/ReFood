import React, { Component } from 'react'
import './Main.css';
import { locationHelper } from "../helpers/helpers"
import Navbar from "./header/Navbar.js"
import Footer from "./footer/Footer.js"
import Recipe from "./panel/Recipe.js"
import PanelRecipes from "./panel/PanelRecipes.js"
import PanelRates from './panel/PanelRates';
import UserContext from "../context/UserContext"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import './content/content.css'
import ButtonPrimary from './MUI/ButtonPrimary';


export default class PanelComponent extends Component{

    static contextType = UserContext;

    constructor(props) {
        super(props);
    }

    render(){
        const props = this.props

        this.context.userData.user.region ?  this.region = this.context.userData.user.region : this.region = 'home'
        this.props.region ? this.region = this.props.region : this.region = locationHelper(this.props.location, this.region)

        return (
        <>
            <Navbar {...props} />
            <div className="panelContainer" style={{background: this.props.color}}>
                <main className="gridContainer">
                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                            <Box px={4} className="panelGridBox">
                                <div className="panelHeader">
                                    <span className="panelHeaderLeft">Your Recipes</span>
                                    <span className="panelHeaderRight"><ButtonPrimary variant="contained" color="primary">Add Recipe</ButtonPrimary></span>
                                </div>
                                <PanelRecipes />
                            </Box>
                        </Grid>
                        <Grid item lg={4}>
                            <Box px={4} className="panelGridBox">
                                <h3>Latest Rates</h3>
                                <PanelRates />
                            </Box>
                        </Grid>
                        <Grid item lg={4}>
                            <Box px={4} className="panelGridBox">
                            Test
                            </Box>
                        </Grid>
                    </Grid>
                </main>
            </div>
            <Footer {...props} />
        </>
        )
    }
}

/**
 * 
 * <header className="App-header">
                    <Recipe {...props} />
                </header>

 */
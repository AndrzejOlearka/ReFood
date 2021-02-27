import React, { Component } from 'react'
import { locationHelper } from "../../helpers/helpers"
import { regionsData } from '../../data/regionsData.js';
import Navbar from "../header/Navbar.js"
import Footer from "../footer/Footer.js"
import './content.css'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import RateStars from "../stars/RateStars";
import Stars from "../stars/Stars";
import CommentForm from "./CommentForm";
import CommentBox from "./CommentBox";

export default class SingleRecipe extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                ingridients: [],
                user: {
                    region: ''
                }
            },
            comments: [
                {
                    user: {}
                }
            ],
            userRates: {},
            avgRate: null
        }
    }

    getCommentsData(){
        const regionLink = this.props.region+'/recipe/'+this.props.match.params.id;
        axios.get("http://localhost:5000/"+regionLink, null
        ).then(response => {
            this.setState({
                recipe: response.data.rec,
                avgRate: response.data.rateAverage.toFixed(2)
            })
        }).catch(error => {
            console.log(error);
        })

        const commentLink = this.props.region+'/recipe/'+this.props.match.params.id+'/comments';
        axios.get("http://localhost:5000/"+commentLink, null
        ).then(response => {
            console.log(response)
            this.setState({
                comments: response.data.comments,
                userRates: response.data.userRates
            })
            console.log(this.state.comments)
        }).catch(error => {
            console.log(error);
        })
    }

    componentDidMount(){
        this.getCommentsData();
    }

    rerenderParentCallback() {
        this.getCommentsData();
        this.forceUpdate();
    }

    render(){
        const props = this.props

        this.props.region ? this.region = this.props.region : this.region = locationHelper(this.props.location, this.context.userData.user.region);
 
        const userLink = '/'+this.state.recipe.user.region.toLowerCase()+'/user/'+this.state.recipe.user._id

        return (
            <>
                <Navbar {...props} />
                    <div className="App" style={{background: regionsData[this.props.region].colors.main_content}}>
                        <header className="App-header">
                            <h1>{this.state.recipe.name}</h1>
                            <h2><p>Rate: <Stars rate={this.state.avgRate}/></p></h2>
                            <main className="gridContainer">
                                <Grid container spacing={2}>
                                    <Grid item xs={false} md={2} lg={3}></Grid>
                                    <Grid item xs={12} md={8} lg={6}>
                                        <Box px={4} className="gridContent">
                                            <p>Region: {this.state.recipe.region}</p>
                                            <p>Ingridients:</p>
                                            <ul>
                                                {this.state.recipe.ingridients.map((ingridient, i) => {                    
                                                    // Return the element. Also pass key     
                                                    return (<li key={i}>{ingridient}</li>) 
                                                })}
                                            </ul>
                                            <p>Added By: <a href={userLink}>{this.state.recipe.user.username}</a></p>
                                            <p>Your Rate: <RateStars {...props}/></p>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={false} md={2} lg={3}></Grid>
                                </Grid>
                            </main>
                        </header>
                        <CommentForm {...props} rerenderParentCallback={this.rerenderParentCallback} />
                        {this.state.comments ? (
                             this.state.comments.map((comment, i) => {   
                                let userRate = 0
                                if(this.state.userRates[comment.user._id]){
                                    userRate = this.state.userRates[comment.user._id]
                                }  
                                return (<CommentBox key={i} comment={comment} userRate={userRate}/>) 
                            })
                        ) : (
                            <p>No Comments</p>
                        )}
                    </div>
                <Footer {...props} />
            </>
        )
    }
}

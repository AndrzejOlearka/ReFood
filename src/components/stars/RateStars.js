import React, { Component } from 'react'
import Rating from 'material-ui-rating'
import axios from 'axios'
import UserContext from "../../context/UserContext"

export default class RateStars extends Component{

    static contextType = UserContext

    constructor(props) {
        super(props);

        this.state = {
            rate: null
        }

        this.getRate = this.getRate.bind(this);
        this.saveRate = this.saveRate.bind(this);
    }

    componentDidMount()
    {
        this.getRate();
    }

    getRate(){
        const rateRecipeLink = this.props.region+'/recipe/'+this.props.match.params.id+'/rate';
        axios.get("http://localhost:5000/"+rateRecipeLink, {
                params: {
                    user: this.context.userData.user.id
                }
            }, 
            {headers: {"x-auth-token":this.context.userData.token}}
        ).then(response => {
            if(response.data)
                if(response.data.rate){
                    this.setState({
                        rate: response.data.rate
                    })
                }
        }).catch(error => {
            console.log(error);
        })
    }

    saveRate(value){

        const rateRecipeLink = this.props.region+'/recipe/'+this.props.match.params.id+'/rate';
        axios.post("http://localhost:5000/"+rateRecipeLink, {
                rate: value,
                userid: this.context.userData.user.id
            }, 
            {headers: {"x-auth-token":this.context.userData.token}}
        ).then(response => {
            if(response.data)
                if(response.data.rate){
                    console.log(response.data.rate)
                    this.setState({
                        rate: response.data.rate
                    })
                }
        }).catch(error => {
            console.log(error);
        })
    }
   
    render() {
       
        if (this.state.rate) {
            return (
                <div>
                    <Rating
                        readOnly={true}
                        precision={0.5}
                        max={5}
                        value={this.state.rate}
                        iconFilled={true}
                    />
                </div>
            );
        }
        return (
           
            <div>
                <Rating
                    precision={0.5}
                    value={0}
                    max={5}
                    onChange={(value) => this.saveRate(value)}
                />
            </div>
        );
    }
 }
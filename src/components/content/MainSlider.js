import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './content.css'
import Stars from "../stars/Stars";
import axios from 'axios'
import SingleSlider from "./SingleSlider"

export default class MainSlider extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      recipes: [
        {user:[{}]},
        {user:[{}]},
        {user:[{}]},
        {user:[{}]},
        {user:[{}]},
        {user:[{}]},
      ], rates: []
    }
  }

  componentDidMount(){
    //this.region = this.props.region 
    axios.get("http://localhost:5000/europe", null).then(response => {
      console.log(response)
      this.setState({
        recipes: response.data.recipes,
        rates: response.data.rates
      })
    }).catch(error => {
        console.log(error);
    })
  }

  componentWillReceiveProps(nextProps){
    //this.region = this.props.region 
    axios.get("http://localhost:5000/europe", null).then(response => {
      console.log(response)
      this.setState({
        recipes: response.data.recipes,
        rates: response.data.rates
      })
    }).catch(error => {
        console.log(error);
    })
 }
  

  render() {
      
    const settings = {
      centerPadding: "50px",
      slidesToShow: 3,
      speed: 500,
      arrows: true
    };
  
    return (
      <div>
        <Slider {...settings} className="slider">
          <SingleSlider recipe={this.state.recipes[0]} rate={this.state.rates[0]}/>
          <SingleSlider recipe={this.state.recipes[1]} rate={this.state.rates[1]}/>
          <SingleSlider recipe={this.state.recipes[2]} rate={this.state.rates[2]}/>
          <SingleSlider recipe={this.state.recipes[3]} rate={this.state.rates[3]}/>
          <SingleSlider recipe={this.state.recipes[4]} rate={this.state.rates[4]}/>
          <SingleSlider recipe={this.state.recipes[5]} rate={this.state.rates[5]}/>
        </Slider>
      </div>
    );
  }
}
//<Stars user={this.state.recipes[0].user.username}/>
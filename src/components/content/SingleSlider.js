import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './content.css'
import '../Main.css'
import Stars from "../stars/Stars";

export default class SingleSlider extends Component {

  constructor(props) {
    super(props);
  }
    
  render() {

    const recipeLink = this.props.recipe.region+'/recipe/'+this.props.recipe._id
    const userLink = this.props.recipe.user[0].region+'/user/'+this.props.recipe.user[0]._id

    return (
        <div className="sliderElement">
            <section className="slide">
            <div className="slideImage">
            <img src="https://ocdn.eu/pulscms-transforms/1/iZ6ktkpTURBXy8zYTg1NGQ5YTUwNmQ3MGUzNWVmM2E2N2FmOGJiNWM2Yy5qcGeTlQMAzKLNFEDNC2STBc0DFM0BvJUH2TIvcHVsc2Ntcy9NREFfLzE0MGIxY2ZlN2YwYWM1MmVkYzAxMGQ3MDk3OGU4NGJlLnBuZwDCAA"/> 
            </div>
            <div className="slideHeader">
              <a href={ recipeLink }>{ this.props.recipe.name }</a>
            </div>
            <div className="slideReview">
                <Stars rate={this.props.rate}/>
                <h2><a href={userLink}>{this.props.recipe.user[0].username}</a></h2>
            </div>
        </section>
      </div>
    );
  }
}

//<img src="https://ocdn.eu/pulscms-transforms/1/iZ6ktkpTURBXy8zYTg1NGQ5YTUwNmQ3MGUzNWVmM2E2N2FmOGJiNWM2Yy5qcGeTlQMAzKLNFEDNC2STBc0DFM0BvJUH2TIvcHVsc2Ntcy9NREFfLzE0MGIxY2ZlN2YwYWM1MmVkYzAxMGQ3MDk3OGU4NGJlLnBuZwDCAA"/> 
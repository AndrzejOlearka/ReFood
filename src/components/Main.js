import React, { Component } from 'react'
import './Main.css';
import Navbar from "./header/Navbar.js"
import Footer from "./footer/Footer.js"

export default class MainComponent extends Component{
  
  render(){

    const props = this.props

    return (
      <>
      <Navbar {...props} />
      <div className="App" style={{background: this.props.color}}>
        <header className="App-header">
          <h1 className="logo">ReFood</h1>
          <h2 className="h2">Explore the food from all around the world</h2>
        </header>
        <main>
          <div className="wrapper">
            <div className="box one">Jeden</div>
            <div className="box two">Dwa</div>
            <div className="box three">Trzy</div>
            <div className="box four">Cztery</div>
            <div className="box five">Pięć</div>
          </div>
        </main>
      </div>
      <Footer {...props} />
      </>

    )
  }
}

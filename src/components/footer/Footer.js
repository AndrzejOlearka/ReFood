import React, { useContext, Component } from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAfrica } from "@fortawesome/free-solid-svg-icons"
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { faGlobeAsia } from "@fortawesome/free-solid-svg-icons"
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import UserContext from "../../context/UserContext"
import { locationHelper } from "../../helpers/helpers"
import { regionsData } from '../../data/regionsData.js';

export default class Footer extends Component{

  static contextType = UserContext;

  constructor(props) {
      super(props);
  }

  render(){

    this.context.userData.user.region ?  this.region = this.context.userData.user.region : this.region = 'home'
    this.props.region ? this.region = this.props.region : this.region = locationHelper(this.props.location, this.region)

    return (
        <footer className="footer" style={{background: regionsData[this.region].colors.nav_footer}}>
            <div className="dots">
              <Link to="/america">
                <span className="dot" style={{color: "#cc0033"}}><FontAwesomeIcon icon={faGlobeAmericas}/></span>
              </Link>
              <Link to="/europe">
                <span className="dot" style={{color: "#0066cc"}}><FontAwesomeIcon icon={faGlobeEurope}/></span>
              </Link>
              <Link to="/australia">
                <span className="dot" style={{color: "#009933"}}><FontAwesomeIcon icon={faGlobeAsia}  rotation={90}/></span>
                </Link>
              <Link to="/asia">
                <span className="dot" style={{color: "#ffb300"}}><FontAwesomeIcon icon={faGlobeAsia}/></span>
              </Link>
              <Link to="/africa">
                <span className="dot" style={{color: "#191919"}}><FontAwesomeIcon icon={faGlobeAfrica}/></span>
              </Link>
            </div>
        </footer>
    )
  }
}

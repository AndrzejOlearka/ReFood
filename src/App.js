import React, {useState, useEffect} from "react"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainComponent from "./components/Main.js"
import Navbar from "./components/header/Navbar.js"
import Footer from "./components/footer/Footer.js"
import RegisterForm from "./components/auth/RegisterForm.js"
import UserContext from "./context/UserContext"
import Axios from "axios"
import PanelComponent from "./components/Panel.js";
import { regionsData } from './data/regionsData.js'; // remove the curly brackets as you have a default export.
import Region from "./components/Region.js";
import PrivateRoute from "./components/PrivateRoute.js";
import SingleRecipe from "./components/content/SingleRecipe.js";

export default function App() {
 
const [userData, setUserData] = useState({
  token: '',
  user: ''
})

const [isLoading, setIsLoading] = useState(true); 

useEffect(() => {

  (async () => {
    
    let token = localStorage.getItem("auth-token")
  
    if(token === null){
      localStorage.setItem("auth-token", "")
      token = "";
    }

    const tokenResponse = await Axios.post(
      "http://localhost:5000/authentication",
       null,
      {headers: {"x-auth-token": token}}
    )

    if(tokenResponse.data){

      try{
        
        const userResponse = await Axios.get(
          "http://localhost:5000/user",
          {headers: {"x-auth-token":token}}
        ) 
        console.log(userResponse);
        setUserData({
          token,
          user: userResponse.data
        })
        setIsLoading(false)

      } catch(error)
      {
        console.log(error.message)
      }
    } else {
      setIsLoading(false)
    }
  })();
 
}, [])
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Router>
      <UserContext.Provider value={{userData, setUserData}}>
        <Switch>
        <Route exact path="/" render = { props =>
        <>
          <MainComponent {...props} />
        </>
      } />

      <Route exact path="/register" render = { props =>
          <RegisterForm {...props} />
      } />

      

      <Route exact path="/europe" render = { props =>
        <><Region {...props} region="europe"/></>
      } />
      <Route exact path="/europe/recipe/:id" render = { props =>
        <><SingleRecipe {...props} region="europe"/></>
      } />
      <Route exact path="/europe/user/:id" render = { props => <></>
        //<><SingleUser {...props} region="europe"/></>
      } />


      <Route exact path="/australia" render = { props =>
        <>
          <Region {...props} region="australia"/>
        </>
      } />

      <Route exact path="/asia" render = { props =>
        <>
          <Region {...props} region="asia"/>
        </>
      } />

      <Route exact path="/africa" render = { props =>
        <>
          <Region {...props} region="africa"/>
        </>
      } />

      <Route exact path="/america" render = { props =>
        <>
          <Region {...props} region="america"/>
        </>
      } />


      <PrivateRoute component={PanelComponent} path="/panel"  />

        </Switch>
      </UserContext.Provider>
    </Router>

  );
}
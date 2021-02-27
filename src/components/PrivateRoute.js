import React, { useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from "../context/UserContext"

const PrivateRoute = ({component: Component, ...rest}) => {
    
    const userData = useContext(UserContext)
    console.log(userData);

    return (
    
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            userData.userData.user ?
                <Component {...props} />
            : <Redirect   to="/"  exact/>
        )} />
    );
};

export default PrivateRoute;
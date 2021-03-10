import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        //const currentUser = authenticationService.currentUserValue;
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to="/login"/>
            //return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        let currentUserRole = AuthenticationService.getCurrentUserRole();
        // check if route is restricted by role
        if (roles && roles.indexOf(currentUserRole) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)



export default PrivateRoute
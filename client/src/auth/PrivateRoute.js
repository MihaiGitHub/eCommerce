import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

// takes a react component and the rest of the properties
const PrivateRoute = ({ component: Component, ...rest }) => (
    // if user is authenticated return the component else redirect so signin
    <Route {...rest} render={props => isAuthenticated() ? (
        <Component {...props} />
    ) : (
        <Redirect 
            to={{  
                pathname: '/signin',
                state: { from: props.location } 
            }}
        />
    )} 
    />
);

export default PrivateRoute;
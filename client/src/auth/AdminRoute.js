import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

// takes a react component and the rest of the properties
const AdminRoute = ({ component: Component, ...rest }) => (
    // if user is authenticated and admin return the component else redirect so signin
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
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

export default AdminRoute;
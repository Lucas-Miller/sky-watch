import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';

// Renders a route component upon confirmation of
// a successful login, otherwise it redirects to
// the login page again

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') // Here we check for a user object in local storage 
            ? <Component {...props} /> // this isn't a security concern because a JWT Token is still required
            : <Redirect to={{pathname: '/login', state: { from: props.location } }} /> 
    )} />
)
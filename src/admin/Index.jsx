// Root component of the admin feature which defines routes for each page
// within the admin section. It is only accessible by admin users and is
// controlled by a private route in the app component

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Overview } from './Overview';
import { Users } from './users';

function Admin({ match }) {
    const { path } = match;

    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                </Switch>
            </div>
        </div>
    );
}

export { Admin };
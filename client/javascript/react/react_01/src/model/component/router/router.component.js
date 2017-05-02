/**
 * A component to create routes.
 * For now this application have just one route (the Landing one).
 */
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Landing as PublicLanding} from 'model/component/subsystems/public/landing/landing.component';

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="*" component={PublicLanding}/>
      </BrowserRouter>
    );
  }
};

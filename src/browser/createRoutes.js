import App from './app/App.react';
import Home from './home/Page.react';
import NotFound from './notfound/Page.react';
import SignUp from './signup/Page.react';
import React from 'react';
import {IndexRoute, Route} from 'react-router';

export default function createRoutes(getState) {

  //const requireAuth = (nextState, replace) => {
    //const loggedInUser = getState().users.viewer;
    //if (!loggedInUser) {
      //replace({
        //pathname: '/login',
        //state: {nextPathname: nextState.location.pathname}
      //});
    //}
  //};
      //<Route component={Auth} path="login" />
      //<Route component={Me} onEnter={requireAuth} path="me">
        //<Route component={Profile} path="profile" />
        //<Route component={Settings} path="settings" />
      //</Route>
      //<Route component={Todos} path="todos" />

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={SignUp} path="signup" />
      <Route component={NotFound} path="*" />
    </Route>
  );

}

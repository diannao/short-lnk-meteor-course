import {Meteor} from 'meteor/meteor';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Links from './../ui/Links';
import NotFound from './../ui/NotFound';

const history = createBrowserHistory({ forceRefresh: true }); // 

//window.browserHistory = history;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    history.replace('/links');
  }
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    history.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  console.log(pathname);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated) {
    console.log('pushing to links');
    history.replace('/links');
  } else if(isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
                <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
                <Route path="/links" component={Links} onEnter={onEnterPrivatePage}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

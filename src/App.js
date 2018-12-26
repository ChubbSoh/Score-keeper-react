import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Homepage from './pages/homepage';
import LoginPage from './pages/loginpage.js';

import NewGame from './containers/newgame';
import Signup from './containers/signup.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/newgame" component={NewGame} />
      </Switch>
    );
  }
}

export default App;

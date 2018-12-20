import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SideNav from './components/sidebar.js';
import Login from './containers/login.js';
import Signup from './containers/signup.js';
import NewGame from './containers/newgame.js';

class App extends Component {

  render() {
    return (
      <div>
        <NewGame />
        <SideNav />
        <Route exact path="/" component={Signup} />
        <Route exact path="/login" component={Login} />       
      </div>
    );
  }
}

export default App;

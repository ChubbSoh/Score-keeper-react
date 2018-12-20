import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav from './components/sidebar.js';
import Login from './containers/login.js';
import { Route } from 'react-router-dom';
import Signup from './containers/signup.js';

class App extends Component {

  render() {
    return (
      <div>
        <SideNav />
        <Route exact path="/" component={Signup} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;

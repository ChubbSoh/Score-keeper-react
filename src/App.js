import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Homepage from './pages/homepage';
import NewGame from './containers/newgame';
import Login from './containers/login.js';
import Signup from './containers/signup.js';
import Camera from './containers/camera';
import AddPlayer from './containers/addplayer';


class App extends Component {
  render() {
    return (
      <div>
        <AddPlayer />
        <Route exact path="/api/v1/signup" component={Signup} />
        <Route exact path="/api/v1/login" component={Login} />
        <Route exact path="/homepage/:id" component={Homepage} />
        <Route exact path="api/v1/game" component={NewGame} />
      </div>
    );
  }
}

export default App;

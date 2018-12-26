import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './pages/homepage';
import NewGame from './containers/newgame';
import Login from './containers/login.js';
import Signup from './containers/signup.js';
import Camera from './containers/camera';
import AddPlayer from './containers/addplayer';
import SideNav from './components/sidebar.js';
import Score from './containers/score';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Score />
          <Route exact path="/api/v1/signup" component={Signup} />
          <Route exact path="/api/v1/login" component={Login} />
          <Route exact path="/" component={props => <Homepage {...props} />} />
          <Route exact path="/game" component={withRouter(NewGame)} />
        </Switch>
      </div>
    );
  }
}

export default App;

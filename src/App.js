import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Homepage from './pages/homepage';
import LoginPage from './pages/loginpage.js';
import NewGame from './containers/newgame';
import Signup from './containers/signup.js';
import Score from './pages/score';
import AddPlayer from './containers/addplayer';
import Camera from './containers/camera';
import Navbar from './components/navbar';
import SideNav from './components/sidebar';
import BottomNav from './components/bottom-nav';
import Backdrop from './components/backdrop';

// const RouteWrapper = ({
//   navHidden = false,
//   component,
//   ...routeProps,
// }) => {
//   return (
//     <Route {...routeProps}
//       render={
//         props => (
//           <div>
//             {navHidden || <Navbar />}
//             {navHidden || <SideNav />}
//             {navHidden || <BottomNav />}
//             {navHidden || <Backdrop />}
//             <component {...props} />
//           </div>
//         )
//       }
//     />
//   )
// }

class App extends Component {
  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    this.state = {
      sideNavOpen: false,
      navHidden: pathname === '/login' || pathname === '/signup'
    }
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(location => {
      const { pathname } = location;
      const navHidden = pathname === '/login' || pathname === '/signup';
      this.setState({ navHidden })
    })
  }

  componentWillUnmount() {
    this.unlisten();
  }

  toggleHandler = () => {
    this.setState((prevState) => {
      return { sideNavOpen: !prevState.sideNavOpen };
    })
  };

  backdropClickHandler = () => {
    this.setState({
      sideNavOpen: false,
    })
  }

  render() {
    const { sideNavOpen, navHidden } = this.state;
    let sideNav;
    let backdrop;
    if (sideNavOpen) {
      sideNav = <SideNav />
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div>
        {!navHidden &&
          <div>
            <Navbar clickHandler={this.toggleHandler} />
            {sideNav}
            {backdrop}
            <BottomNav />
          </div>
        }
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/login' />} />
          <Route navHidden exact path='/login' component={LoginPage} />
          <Route navHidden exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/newgame" component={NewGame} />
          <Route exact path="/startgame" component={Score} />
          <Route exact path="/players" component={AddPlayer} />
          <Route exact path="/camera" component={Camera} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);


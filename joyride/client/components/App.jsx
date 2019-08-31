import React, { Component } from 'react';
// import tractor from './tractor.svg';
import '../css/App.css';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import Listings from './Listings.jsx';
import NewRide from './NewRide.jsx';
import Register from './Register.jsx';
import About from './About.jsx'
import Login from './Login.jsx';
import LogOut from './LogOut.jsx';
import MyAccount from './MyAccount.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import EditRide from './EditRide.jsx';

const tractor = require('../images/tractor-72-194019.png');

/**
 * Main app entrypoint for React.
 * @TODO determine which entry points I need and how to structure the header.
 * @TODO create a landing page for successful submissions.
 * @TODO create an account page with ability to manage rides.
 */
class App extends Component {

  constructor(props) {
    super(props);

    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    this.state = {
        isUserSignedIn: false
    };
  }

  componentDidMount() {
    this.signedInUser();
  }

  /**
   * See if user is signed in.
   */
  signedInUser() {
    const uri = `http://localhost:${process.env.PORT}/user/checktoken`;

    const self = this;

    fetch(uri, {
        method: "POST"
    }).then(function(response) {
        // set firstname and lastname here in self.setstate
        if (response.ok && response.status == 200) {
          console.log('do something here');
          self.setState(state => ({
            isUserSignedIn: true
          }));
        } else if (response.status == 401) {
          console.log('user not logged in');
          self.setState(state => ({
            isUserSignedIn: false
          }));
        } else if (response.status == 404) {
          console.log('user does not exist');
          self.setState(state => ({
            isUserSignedIn: false
          }));
        }
        return response.json();
    }).then(function(jsonresponse) {
        console.log(jsonresponse);
    }).catch(function(err) {
        console.log('Request failed', err);
    });
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <Link to="/">
              <img id="logo" src={tractor} className="App-logo" alt="logo" />
            </Link>
            <h2>JOYRIDE</h2>
            <DropdownMenu width={this.scrWidth}/>
            <div className="mainMenu">
              <NavLink className="menuOption" to="/myaccount" hidden={!this.state.isUserSignedIn}>
                My Account
              </NavLink>
              <NavLink className="menuOption" to="/newRide" hidden={!this.state.isUserSignedIn}>
                New Ride
              </NavLink>
              <NavLink className="menuOption" to="/register" hidden={this.state.isUserSignedIn}>
                Sign up
              </NavLink>
              <NavLink className="menuOption" to="/about">
                About me
              </NavLink>
              <NavLink className="menuOption" to="/login" hidden={this.state.isUserSignedIn}>
                Log in
              </NavLink>
              <NavLink className="menuOption" to="/logout" hidden={!this.state.isUserSignedIn}>
                Log out
              </NavLink>
            </div>
          </div>
          <Route exact path="/" component={Listings} />
          <Route path="/newRide" component={NewRide} />
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/editride" component={EditRide} />
        </div>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
      </Router>
      );
    }
}

export default App;

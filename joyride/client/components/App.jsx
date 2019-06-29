import React, { Component } from 'react';
// import tractor from './tractor.svg';
import '../css/App.css';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import Listings from './Listings.jsx';
import NewRide from './NewRide.jsx';
import Register from './Register.jsx';
import About from './About.jsx'
import Login from './Login.jsx';
import Logout from './LogOut.jsx';
import LogOut from './LogOut.jsx';

const tractor = require('../images/tractor-72-194019.png');

/**
 * Main app entrypoint for React.
 * @TODO determine which entry points I need and how to structure the header.
 * @TODO create a landing page for successful submissions.
 * @TODO automatically detect if user is logged in using checkToken route in UserController.jsx to hide/show certain buttons.
 */
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        isUserSignedIn: false
    };
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
        if (response.ok) {
          console.log('do something here');
        } else if (response.status == 200) {
          console.log('or do something here');
        } else if (response.status == 401) {
          console.log('user not logged in');
        } else if (response.status == 404) {
          console.log('user does not exist');
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
            <div className="mainMenu">
              <NavLink className="menuOption" to="/newRide">
                New Ride
                {/* <button id="new-form-button" type="button" className="HeaderButton">New Ride</button> */}
              </NavLink>
              <NavLink className="menuOption" to="/register">
                Sign up
                {/* <button id="register-button" type="button" className="HeaderButton">Sign up</button> */}
              </NavLink>
              <NavLink className="menuOption" to="/about">
                About me
                {/* <button id="about-page-button" type="button" className="HeaderButton">About me</button> */}
              </NavLink>
              <NavLink className="menuOption" to="/login">
                Log in
                {/* <button id="login-button" type="button" className="HeaderButton">Log in</button> */}
              </NavLink>
              <NavLink className="menuOption" to="/logout">
                Log out
                {/* <button id="login-button" type="button" className="HeaderButton">Log in</button> */}
              </NavLink>
            </div>
          </div>
          <Route exact path="/" component={Listings} />
          <Route path="/newRide" component={NewRide} />
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut} />
        </div>
      </Router>
      );
    }
}

export default App;

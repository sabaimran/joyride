import React, { Component } from 'react';
// import tractor from './tractor.svg';
import '../css/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Listings from './Listings.jsx';
import NewRide from './NewRide.jsx';
import Register from './Register.jsx';

const tractor = require('../images/tractor-72-194019.png');

/**
 * Main app entrypoint for React.
 * @TODO determine which entry points I need and how to structure the header.
 */
class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <Link to="/">
              <img id="logo" src={tractor} className="App-logo" alt="logo" />
            </Link>
            <h2>JOYRIDE</h2>
            <Link to="/newRide">
              <button id="new-form-button" type="button" className="HeaderButton">New Ride</button>
            </Link>
            <Link to="/register">
              <button id="register-button" type="button" className="HeaderButton">Sign up</button>
            </Link>
          </div>
          <Route exact path="/" component={Listings} />
          <Route path="/newRide" component={NewRide} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;

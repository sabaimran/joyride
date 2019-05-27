import React, { Component } from 'react';
// import tractor from './tractor.svg';
import '../css/App.css';
import Listings from './Listings.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NewRide from './NewRide.jsx';

const tractor = require('../images/tractor-72-194019.png');

class App extends Component {
  // constructor() {
  //   super();
  //   this.setState = {
  //     hideNewRideButton: false
  //   };
  // }

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
            {/* <Link to="/explainme">
              <button id="how-it-works-button" type="button" className="HeaderButton">New Ride</button>
            </Link> */}
          </div>
          <Route exact path="/" component={Listings} />
          <Route path="/newRide" component={NewRide} />
        </div>
      </Router>
    );
  }
}

export default App;

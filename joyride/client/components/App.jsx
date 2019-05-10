import React, { Component } from 'react';
// import tractor from './tractor.svg';
import '../css/App.css';
import Listings from './Listings.jsx';

const tractor = require('../images/tractor-72-194019.png');

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img id="logo" src={tractor} className="App-logo" alt="logo" />
          <h2>JOYRIDE</h2>
        </div>
        <p className="App-intro">
          Click on the button to toggle the <code>direction</code>.
        </p>
        <Listings />
      </div>
    );
  }
}

export default App;

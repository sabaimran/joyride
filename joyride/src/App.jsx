import React, { Component } from 'react';
import logo from './logo.svg';
import tractor from './tractor.svg';
import './App.css';
import Listings from './Listings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={tractor} className="App-logo" alt="logo" />
          <h2>Welcome to Joyride</h2>
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

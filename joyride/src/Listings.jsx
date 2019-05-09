import React, { Component } from 'react';
import './App.css';

class Listings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ChiToChamp: true,
        };
    }

    toggleList = () => {
        this.setState(state => (
            {
                ChiToChamp: !state.ChiToChamp
            }
        ));
    }

    render() {
        return (
            <div className="Listing">
                <Heading ChiToChamp={this.state.ChiToChamp} /> 
                <div>
                    <button className="toggleButton" onClick={this.toggleList} type="button">Switch Directions</button>
                    <br></br>
                </div>
            </div>
        );
    }    
}

const chiToChaText = "Chicago to Champaign";
const chaToChiText = "Champaign to Chicago";
const Heading = ({ ChiToChamp }) => ChiToChamp ? <h1>{chiToChaText}</h1> : <h1>{chaToChiText}</h1>;

export default Listings

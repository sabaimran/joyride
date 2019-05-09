import React, { Component } from 'react';
import './App.css';

class Listings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ChiToChamp: true,
        };
    }

    DynamicList(props) {
        return (
            <div>
                <ul>
                    {props.listings.map((listing) => (
                        <li>{listing}</li>
                    ))}
                </ul>
            </div>
        );
    }

    toggleList = () => {
        this.setState(state => (
            {
                ChiToChamp: !state.ChiToChamp
            }
        ));
    }

    render() {
        const numeros = this.state.ChiToChamp ? [1,2,3,4,5] : [5,4,3,2,1];
        return (
            <div className="Listing">
                <Heading ChiToChamp={this.state.ChiToChamp} /> 
                <div>
                    <button className="toggleButton" onClick={this.toggleList} type="button">Switch Directions</button>
                    <br></br>
                </div>
                <this.DynamicList listings={numeros} />
            </div>
        );
    }    
}

const chiToChaText = "Chicago to Champaign";
const chaToChiText = "Champaign to Chicago";
const Heading = ({ ChiToChamp }) => ChiToChamp ? <h1>{chiToChaText}</h1> : <h1>{chaToChiText}</h1>;

export default Listings

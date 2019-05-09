import React, { Component } from 'react';
import './App.css';
import DynamicRides from './Ride';

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
                    {props.rides.map((rides) => (
                        <li>{rides.name}</li>
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
        
        const mark = [ { name: "mark"} ];
        const david = [ { name: "david"} ];
        const rides = this.state.ChiToChamp ? mark : david;
        return (
            <div className="Listing">
                <Heading ChiToChamp={this.state.ChiToChamp} /> 
                <div>
                    <button className="toggleButton" onClick={this.toggleList} type="button">Switch Directions</button>
                    <br></br>
                </div>
                {/* <this.DynamicList rides={rides} /> */}
                <DynamicRides rides={rides}/>
            </div>
        );
    }    
}

const chiToChaText = "Chicago to Champaign";
const chaToChiText = "Champaign to Chicago";
const Heading = ({ ChiToChamp }) => ChiToChamp ? <h1>{chiToChaText}</h1> : <h1>{chaToChiText}</h1>;

export default Listings

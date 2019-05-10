import React, { Component } from 'react';
import '../css/App.css';
import DynamicRides from './Ride.jsx';

class Listings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ChiToChamp: true,
        };

        this.toggleList = this.toggleList.bind(this);
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

    toggleList() {
        this.setState(state => (
            {
                ChiToChamp: !state.ChiToChamp
            }
        ));
    }

    render() {
        
        // These will have to be read from a database
        const mark = [ { name: "mark", departure: "Oak Brook", destination: "Union", time: new Date() } , 
                        { name: "samuel", departure: "O'hare", destination: "Altgeld", time: new Date() } ];
        const david = [ { name: "david", departure: "Union", destination: "Oak Brook", time: new Date() } ];
        const rides = this.state.ChiToChamp ? mark : david;
        console.log("DATE EXAMPLE " + new Date().toString());
        return (
            <div className="Listing">
                <p className="App-intro">
                    Click on the button to toggle the <code>direction</code>.
                </p>
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

export default Listings;

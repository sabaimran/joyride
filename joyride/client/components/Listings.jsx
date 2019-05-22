import React, { Component } from 'react';
import '../css/App.css';
import DynamicRides from './DynamicRides.jsx';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import request from 'request';

class Listings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ChiToChamp: true,
            searchDate: new Date()
        };

        this.toggleList = this.toggleList.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getListOfRides = this.getListOfRides.bind(this);
    }

    // DynamicList(props) {
    //     return (
    //         <div>
    //             <ul>
    //                 {props.rides.map((rides) => (
    //                     <li>{rides.name}</li>
    //                 ))}
    //             </ul>
    //         </div>
    //     );
    // }

    getListOfRides() {
        const uri = `http://localhost:${process.env.PORT}/ride`;
        console.log(uri);

        request(uri, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for all rides query.

            const rides = JSON.parse(body);
            console.log(rides);

            for (const ride of rides) {
                console.log(ride.category);
            }

            // if (body) {
            //     body.foreach(function (ride) {
            //         console.log(ride);
            //     })
            // }
        });
    }

    toggleList() {
        this.setState(state => (
            {
                ChiToChamp: !state.ChiToChamp
            }
        ));
    }

    handleDateChange(date) {
        this.setState({
            searchDate: date
        });
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
                    <DatePicker className="searchFilter" name="searchDate" selected={this.state.searchDate} onChange={this.handleDateChange} dateFormat="MMMM d, yyyy" minDate={new Date()}/>
                    <br></br>
                </div>
                {/* <this.DynamicList rides={rides} /> */}
                <DynamicRides rides={rides}/>
                <button className="toggleButton" onClick={this.getListOfRides} type="button">Get All Rides</button>
            </div>
        );
    }    
}

const chiToChaText = "Chicago to Champaign";
const chaToChiText = "Champaign to Chicago";
const Heading = ({ ChiToChamp }) => ChiToChamp ? <h1>{chiToChaText}</h1> : <h1>{chaToChiText}</h1>;

export default Listings;

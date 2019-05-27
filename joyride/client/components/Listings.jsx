import React, { Component } from 'react';
import '../css/App.css';
import DynamicRides from './DynamicRides.jsx';
import DatePicker from "react-datepicker";
import LocationConstants from './LocationConstants.ts';

import "react-datepicker/dist/react-datepicker.css";
import request from 'request';

class Listings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ChiToChamp: true,
            searchDate: new Date(),
            RidesChiToChamp: [],
            RidesChampToChi: []
        };

        this.toggleList = this.toggleList.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getListOfRides = this.getListOfRides.bind(this);
        this.getListOfRides();
    }

    getListOfRides() {
        const uri = `http://localhost:${process.env.PORT}/ride`;
        const displayRides = [];
        const self = this;

        request.get(uri, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for all rides query.

            const rides = JSON.parse(body);
            // console.log(rides);

            // convert to array in order to use nice syntax. make sure to follow the schema pattens.
            for (const ride of rides) {
                // @TODO sanitize data and delete this later.
                const tempdate = ride.date ? ride.date : new Date();

                var departure, destination;

                if (ride.category == "ChicagoToChampaign") {
                    console.log(LocationConstants.ChicagoPlaces[ride.departure]);
                    console.log(LocationConstants.ChampaignPlaces[ride.destination]);

                    departure = LocationConstants.ChicagoPlaces[ride.departure].place;
                    destination = LocationConstants.ChampaignPlaces[ride.destination].place;
                } else {
                    console.log(LocationConstants.ChampaignPlaces[ride.departure]);
                    console.log(LocationConstants.ChicagoPlaces[ride.destination]);
                    
                    departure = LocationConstants.ChampaignPlaces[ride.departure].place;
                    destination = LocationConstants.ChicagoPlaces[ride.destination].place;
                }
                

                // console.log(ride);
                displayRides.push({
                    firstname: ride.firstname,
                    lastname: ride.lastname,
                    departure: departure,
                    destination: destination,
                    date: tempdate
                })
            }

            self.setState(state => ({
                RidesChampToChi: displayRides
            }));

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
        // this.getListOfRides();
        const rides = this.state.ChiToChamp ? this.state.RidesChampToChi : this.state.RidesChampToChi;
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
                <DynamicRides rides={rides}/>
                {/* <button className="toggleButton" onClick={this.getListOfRides} type="button">Get All Rides</button> */}
            </div>
        );
    }    
}

const chiToChaText = "Chicago to Champaign";
const chaToChiText = "Champaign to Chicago";
const Heading = ({ ChiToChamp }) => ChiToChamp ? <h1>{chiToChaText}</h1> : <h1>{chaToChiText}</h1>;

export default Listings;

import React, { Component } from 'react';
import '../css/App.css';
import DynamicRides from './DynamicRides.jsx';
import DatePicker from "react-datepicker";
import LocationConstants from './LocationConstants.ts';

import "react-datepicker/dist/react-datepicker.css";
import request from 'request';

/**
 * Front page with all the rides available, subject to filter.
 */
class Listings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ChiToChamp: true,
            searchDate: new Date(),
            Rides: []
        };

        this.toggleList = this.toggleList.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getListOfRides = this.getListOfRides.bind(this);
        this.getListOfRides();
    }

    /**
     * Depending on state, get the list of all relevant rides from mongodb.
     */
    getListOfRides() {
        // Populate the main page with the list of rides in a specific direction.
        var uri = `http://localhost:${process.env.PORT}/ride`;
        uri += "?dir=";
        uri += this.state.ChiToChamp ? "ChicagoToChampaign" : "ChampaignToChicago";
        uri += "&date=";
        uri += this.state.searchDate.toString();

        const displayRides = [];
        const self = this;

        var departureConsts, destinationConsts;
        if (this.state.ChiToChamp) {
            departureConsts = LocationConstants.ChicagoPlaces;
            destinationConsts = LocationConstants.ChampaignPlaces;
        } else {
            departureConsts = LocationConstants.ChampaignPlaces;
            destinationConsts = LocationConstants.ChicagoPlaces;
        }

        request.get(uri, function (error, response, body) {
            // Print the error if one occurred
            console.error('error:', error); 
            // Print the response status code if a response was received
            console.log('statusCode:', response && response.statusCode); 
            // Print the HTML for all rides query.
            console.log('body:', body); 

            const rides = JSON.parse(body);

            // Convert to array in order to use nice syntax. make sure to follow the schema pattens.
            for (const ride of rides) {

                var departurePlace, destinationPlace;
                departurePlace = (departureConsts[ride.departure]).place;
                destinationPlace = (destinationConsts[ride.destination]).place

                displayRides.push({
                    firstname: ride.firstname,
                    lastname: ride.lastname,
                    departure: departurePlace,
                    destination: destinationPlace,
                    date: ride.date
                })
            }

            self.setState(state => ({
                Rides: displayRides
            }));

        });
    }

    /**
     * Handle when user presses the toggle button to switch the direction of rides.
     */
    toggleList() {
        this.setState(state => ({
                ChiToChamp: !state.ChiToChamp
        }), function() {
            this.getListOfRides();
        });
    }

    /**
     * Handle when user modifies the date selected on the drop down calendar.
     */
    handleDateChange(date) {
        const tempdate = new Date(date);
        console.log(this.state.searchDate);
        
        // Get the 00:00:00 time date to help with search.
        this.setState({
            searchDate: new Date(tempdate.toDateString())
        }, function() {
            this.getListOfRides();
        });
    }

    render() {
        // this.getListOfRides();
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
                <DynamicRides rides={this.state.Rides}/>
            </div>
        );
    }    
}

/**
 * A lightweight component for displaying a heading.
 */
const chiToChaText = "Chicago to Champaign";
const chaToChiText = "Champaign to Chicago";
const Heading = ({ ChiToChamp }) => ChiToChamp ? <h1>{chiToChaText}</h1> : <h1>{chaToChiText}</h1>;

export default Listings;

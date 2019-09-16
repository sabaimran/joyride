import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LocationConstants from './LocationConstants.ts';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import request from 'request';

/**
 * Page for editing a ride entry.
 */
class EditRide extends Component {

    // @TODO change this so that as prop only the ride id is passed in; other info can be extracted from there.
    constructor(props) {
        super(props);
        this.state = {
            rideID: this.props.location.state.rideID,
            firstname: '',
            lastname: '',
            category: '',
            departure: '',
            destination: '',
            date: new Date(),
            errorMessage: '',
            loggedin: true,
            driverID: '',
            submitted: false
        };

        this.getRideByID();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.DynamicDropDownMenu = this.DynamicDropDownMenu.bind(this);
        this.Errors = this.Errors.bind(this);

        // Check for active token. If not, then prompt user to sign in or register.
    }

    /**
     * See if user is signed in. If so, open the edit ride form. If not, prompt them to sign in.
     */
    signedInUser() {
        const uri = `http://localhost:${process.env.PORT}/user/checktoken`;

        const self = this;

        fetch(uri, {
            method: "POST"
        }).then(function(response) {
            // Check if login worked. If not, then show not logged in. 
            if (response.status == 404 || 
                response.status == 401) {
                    self.setState(() => ({
                        loggedin: false
                    }));
            }
            return response.json();
        }).then(function(signinResult) {
            // If there is a user signed in, populate the first and last name fields.
            if(signinResult.success) {
                if (signinResult.founduser._id !== self.state.driverID) {
                    console.log('logged in user is not driver of this ride');
                    self.setState(() => ({
                        loggedin: false
                    }));
                } else {
                    self.setState(() => ({
                        firstname: signinResult.founduser.firstname,
                        lastname: signinResult.founduser.lastname
                    }));
                }
            }
        }).catch(function(err) {
            console.log('Request failed', err);
        });
    }

    getRideByID() {
        var uri = `http://localhost:${process.env.PORT}/ride/${this.state.rideID}`;
        self = this;
        request.get(uri, function (error, response, body) {
            // Print the error if one occurred
            if (error) {
                console.error('error:', error); 
            }
            // Print the response status code if a response was received
            console.log('statusCode:', response && response.statusCode); 
            // Print the HTML for all rides query.
            console.log('body:', body); 

            const ride = JSON.parse(body);

            const currentDate = new Date(ride.date);

            self.setState({
                category: ride.category,
                departure: ride.departure,
                destination: ride.destination,
                date: currentDate,
                driverID: ride.driverID
            }, () => {
                self.signedInUser();
            });

            console.log(ride);
        });
    }

    /**
     * Update state when values are changed.
     * @param {} event 
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    /**
     * Update category and departure/destination state when category is changed.
     * @param {} event 
     */
    handleCategoryChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (value == "ChicagoToChampaign") {
            this.setState({
                departure: 'oakbrook',
                destination: 'union'
            });
        } else {
            this.setState({
                departure: 'union',
                destination: 'oakbrook'
            });
        }
    }

    /**
     * Update the date specified in the calendar.
     * @param {*} date 
     */
    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    /**
     * Handle the form submit by creating a post request.
     */
    handleSubmit(event) {
        event.preventDefault();
        // Make the put request
        const uri = `http://localhost:${process.env.PORT}/ride/${this.state.rideID}`;

        const formdata = JSON.stringify(this.state);
        self = this;

        fetch(uri, {
            method: "PUT",
            body: formdata,
            headers: {
            "Content-Type": "application/json"
            }
        }).then(function(response) {
            self.setState({
                submitted: true
            });
            return response.json();
        }).catch(function(err) {
            console.log('Request failed', err);
        });
    }

    /**
     * Create a dropdown menu populated with specific locations.
     * @param {*} props : specify which direction the dropdown menu would accomodate
     */
    DynamicDropDownMenu(props) {
        let locationArray = [];
        var locations;

        var val;

        // Departure dropdown menu.
        if (props.stop == "departure") {
            locations = this.state.category == "ChicagoToChampaign" ? 
            LocationConstants.ChicagoPlaces : 
            LocationConstants.ChampaignPlaces;
            val = this.state.departure;
        } else {
            // Destination dropdown menu.
            locations = this.state.category == "ChicagoToChampaign" ? 
            LocationConstants.ChampaignPlaces : 
            LocationConstants.ChicagoPlaces;
            val = this.state.destination;
        }

        // Pair all menu items with their values.
        Object.keys(locations).forEach(key => {
            locationArray.push(
                <option key={key} value={key}>{locations[key].place}</option>
            )
        })

        return (
            <select name={props.stop} value={val} onChange={this.handleChange}>
                {locationArray}
            </select>
        )
    };

    /**
     * Display errors if there are any.
     */
    Errors() {
        return (
            <div className="Form-Errors">{this.state.errorMessage}</div>
        )
    }

    /**
     * A form for entering input to edit a ride entry in the database.
     */
    render() {
        console.log('this.state.loggedin: ', this.state.loggedin)
        if (!this.state.loggedin) {
            return (
                <Redirect to="/login"/>
            );
        }

        if (this.state.submitted) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <div className="NewRideForm-container">
                <h1 className="formInput">Edit your ride</h1>
                <this.Errors/>
                <form className="NewRideForm" onSubmit={this.handleSubmit}>
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td colSpan="1" className="NewRideTwoColumns">
                                    <label>First name</label>
                                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} readOnly />
                                </td>
                                <td colSpan="1" className="NewRideTwoColumns">
                                    <label>Last name</label>
                                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <label>Choose your category</label>
                                    <select name="category" value={this.state.category} onChange={this.handleCategoryChange}>
                                        <option value='ChicagoToChampaign'>Chicago to Champaign</option>
                                        <option value='ChampaignToChicago'>Champaign to Chicago</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="1">
                                    <label>Pick your departure</label>
                                    <this.DynamicDropDownMenu stop="departure" />
                                </td>
                                <td colSpan="1">
                                    <label>Pick your destination</label>
                                    <this.DynamicDropDownMenu stop="destination" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="1">
                                    <label>Number of Seats</label>
                                    <input type="text" name="numberOfSeats" pattern="[0-9]*" value={this.state.numberOfSeats} onChange={this.handleNumberChange} />                                   
                                </td>
                                <td colSpan="1">
                                    <label>Price of Ride</label>
                                    <input type="text" name="price" pattern="[0-9]*" value={this.state.price} onChange={this.handleNumberChange} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <label>Travel Date</label>
                                    <DatePicker className="customCalendar" name="date" selected={this.state.date} onChange={this.handleDateChange} showTimeInput timeInputLabel="Pickup time" minDate={new Date()}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default EditRide;

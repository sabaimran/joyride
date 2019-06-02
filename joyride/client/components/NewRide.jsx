import React, { Component } from 'react';
import LocationConstants from './LocationConstants.ts';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

/**
 * Page for creating a new ride entry.
 * @TODO make sure user is logged in before they're creating a ride, and store userID instead of firstname/lastname.
 */
class NewRide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            category: 'ChicagoToChampaign',
            departure: 'oakbrook',
            destination: 'union',
            date: new Date(),
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.DynamicDropDownMenu = this.DynamicDropDownMenu.bind(this);
        this.Errors = this.Errors.bind(this);

        // Check for active token. If not, then prompt user to sign in or register.
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
     * Update the date specified in the calendar.
     * @param {*} date 
     */
    handleDateChange(date) {
        this.setState({
            date: date
        });
        console.log('date of ride: '+this.state.date);
    }

    /**
     * Handle the form submit by creating a post request.
     */
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.firstname || 
            !this.state.lastname) {
                this.setState({
                    errorMessage: "Need to fill in a name!"
                });
        } else {
            // Make the post request
            const uri = `http://localhost:${process.env.PORT}/ride`;

            // Get user id and send it in with the post request. 

            const formdata = JSON.stringify(this.state);

            fetch(uri, {
                method: "POST",
                body: formdata,
                headers: {
                "Content-Type": "application/json"
                }
            }).then(function(response) {
                return response.json();
            }).catch(function(err) {
                console.log('Request failed', err);
            });
        }
    }

    /**
     * Create a dropdown menu populated with specific locations.
     * @param {*} props : specify which direction the dropdown menu would accomodate
     */
    DynamicDropDownMenu(props) {
        let locationArray = [];
        var locations;

        var val;
        if (props.stop == "departure") {
            locations = this.state.category == "ChicagoToChampaign" ? 
            LocationConstants.ChicagoPlaces : 
            LocationConstants.ChampaignPlaces;
            val = this.state.departure;
        } else {
            locations = this.state.category == "ChampaignToChicago" ? 
            LocationConstants.ChicagoPlaces : 
            LocationConstants.ChampaignPlaces;
            val = this.state.destination;
        }

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
        console.log(this.state.errorMessage);
        return (
            <div className="Form-Errors">{this.state.errorMessage}</div>
        )
    }

    /**
     * A form for entering input to create a new ride entry in the database.
     */
    render() {
        return (
            <div className="NewRideForm-container">
                <h1 className="formInput">Create a new ride</h1>
                <this.Errors/>
                <form className="NewRideForm" onSubmit={this.handleSubmit}>
                    <label className="NewRideFormInput">First name</label>
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />

                    <label className="NewRideFormInput">Last name</label>
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} />

                    <label className="NewRideFormInput">Choose your category</label>
                    <select name="category" value={this.state.category} onChange={this.handleChange}>
                        <option value='ChicagoToChampaign'>Chicago to Champaign</option>
                        <option value='ChampaignToChicago'>Champaign to Chicago</option>
                    </select>

                    <label className="NewRideFormInput">Travel Date</label>
                    <DatePicker className="customCalendar" name="date" selected={this.state.date} onChange={this.handleDateChange} showTimeInput timeInputLabel="Pickup time" minDate={new Date()}/>

                    <label className="NewRideFormInput">Pick your departure</label>
                    <this.DynamicDropDownMenu stop="departure" />
                    <label className="NewRideFormInput">Pick your destination</label>
                    <this.DynamicDropDownMenu stop="destination" />
                    
                    <input className="NewRideFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default NewRide;

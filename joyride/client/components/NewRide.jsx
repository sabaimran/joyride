import React, { Component } from 'react';
import LocationConstants from './LocationConstants.ts';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

/**
 * Page for creating a new ride entry.
 */
class NewRide extends Component {

    constructor(props) {
        super(props);
        // const button = document.getElementById("new-form-button");
        // button.style.display = 'none';
        this.state = {
            firstname: '',
            lastname: '',
            category: 'ChicagoToChampaign',
            departure: 'oakbrook',
            destination: 'union',
            date: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.DynamicDropDownMenu = this.DynamicDropDownMenu.bind(this);
    }

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
        // Make the post request
        const uri = `http://localhost:${process.env.PORT}/ride`;

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

    /**
     * Create a dropdown menu populated with specific locations.
     * @param {*} props : specify which direction the dropdown menu would accomodate
     */
    DynamicDropDownMenu(props) {
        let locationArray = [];
        var locations;

        var val;
        if (props.stop == "departure") {
            locations = this.state.category == "ChicagoToChampaign" ? LocationConstants.ChicagoPlaces : LocationConstants.ChampaignPlaces;
            val = this.state.departure;
        } else {
            locations = this.state.category == "ChampaignToChicago" ? LocationConstants.ChicagoPlaces : LocationConstants.ChampaignPlaces;
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
     * A form for entering input to create a new ride entry in the database.
     */
    render() {
        return (
            <div>
                <p>This is a new ride form, hello.</p>
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

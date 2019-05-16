import React, { Component } from 'react';
import LocationConstants from './LocationConstants.ts';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class NewRide extends Component {

    constructor(props) {
        super(props);
        // const button = document.getElementById("new-form-button");
        // button.style.display = 'none';
        this.state = {
            firstname: '',
            lastname: '',
            category: 'ChicagoToChampaign',
            departure: '',
            destination: '',
            date: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.DynamicDropDownMenu = this.DynamicDropDownMenu.bind(this);
    }

    handleChange(event) {
        console.log(event);
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    handleSubmit(event) {
        alert("Your direction is " + this.state.value);
        event.preventDefault();
    }

    DynamicDropDownMenu(props) {
        let locationArray = [];
        var locations;

        var val;
        if (props.stop == "departure") {
            locations = this.state.category == "ChicagoToChampaign" ? LocationConstants.ChicagoPlaces : LocationConstants.ChampaignPlaces;
            val = this.state.departure;
        } else {
            locations = this.state.category == "ChampaignToChicago" ? LocationConstants.ChicagoPlaces : LocationConstants.ChampaignPlaces;
            val = this.state.arrival;
        }

        Object.keys(locations).forEach(key => {
            locationArray.push(
                <option value={key}>{locations[key].place}</option>
            )
        })

        return (
            <select name={props.stop} value={val} onChange={this.handleChange}>
                {locationArray}
            </select>
        )
    };

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
                    <this.DynamicDropDownMenu stop="arrival" />
                    
                    <input className="NewRideFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default NewRide;

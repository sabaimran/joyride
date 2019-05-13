import React, { Component } from 'react';
import LocationConstants from './LocationConstants.ts';
// import ChampaignPlaces from './LocationConstants.ts';

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
            date: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DynamicDropDownMenu = this.DynamicDropDownMenu.bind(this);

        // this.ChicagoPlaces = ChicagoPlaces.bind(this);
        // this.ChampaignPlaces = ChampaignPlaces.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // console.log("name "+name+" value "+value+" name "+name);

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert("Your direction is " + this.state.value);
        event.preventDefault();
    }

    DynamicDropDownMenu(props) {
        console.log("chicago places in dynamicdropdown: "+ LocationConstants.ChicagoPlaces.length);
        console.log("chicago places in dynamicdropdown: "+ LocationConstants.ChampaignPlaces.length);

        let locationArray = [];
        var locations;
        if (props.stop == "departure") {
            console.log("DEPARTURES DDDM");
            locations = this.state.category == "ChicagoToChampaign" ? LocationConstants.ChicagoPlaces : LocationConstants.ChampaignPlaces;
            // console.log(locations.size+": locations length");
            // console.log(this.state.category+": category");
            // not sure if you can map a map. might have to construct a for loop?
            // return(
            //     <select name={props.stop} value={this.state.departure} onChange={this.handleChange}>
            //         {locations.map((key, place) => (
            //             <option value={key}>{place}</option>
            //         ))}
            //     </select>
            // );
        } else {
            console.log("ARRIVALS DDDM");
            locations = this.state.category == "ChampaignToChicago" ? LocationConstants.ChicagoPlaces : LocationConstants.ChampaignPlaces;
            // locations = ChampaignPlaces;
            // console.log(locations.size+": locations length");
            // console.log(this.state.category+": category");
            // return(
            //     <select name={props.stop} value={this.state.arrival} onChange={this.handleChange}>
                    // {locations.map((key, place) => (
                    //     <option value={key}>{place}</option>
                    // ))}
            //     </select>
            // )
        }
        // for (let [key, place] of locations) {
        //     locationArray.push(
        //         <option value={key}>{place}</option>
        //     )
        // }

        // console.log(typeof(locations))

        // Array.from(locations.keys()).forEach( key => console.log(key));
        // Object.keys(locations).forEach(cat => {
        //     console.log("cat: "+cat)
        //     Object.keys(locations[cat]).forEach(key => {
        //         console.log("key "+key)
        //         console.log("result "+locations[cat][key].place);
        //         // console.log("result "+locations[cat][key]);
        //         locationArray.push(
        //             <option value={key}>{locations[cat][key].place}</option>
        //         )
        //     })
        // })
        Object.keys(locations).forEach(key => {
            console.log("key: "+key)
            console.log("result "+locations[key].place);
            // console.log("result "+locations[cat][key]);
            locationArray.push(
                <option value={key}>{locations[key].place}</option>
            )
        })



        return (
            <select name={props.stop} value={this.state.arrival} onChange={this.handleChange}>
                {/* {locations.map((key, place) => (
                    <option value={key}>{place}</option>
                ))} */}
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

                    {/* <label className="NewRideFormInput">Pick your departure</label>
                    <select name="departure" value={this.state.departure} onChange={this.handleChange}>
                        <option value='OakBrook'>Oak Brook Mall</option>
                        <option value='Woodfield'>Woodfield Mall</option>
                        <option value='Ohare'>O'hare</option>
                    </select>

                    <label className="NewRideFormInput">Pick your destination</label>
                    <select name="arrival" value={this.state.arrival} onChange={this.handleChange}>
                        <option value='ChicagoToChampaign'>Chicago to Champaign</option>
                        <option value='ChampaignToChicago'>Champaign to Chicago</option>
                    </select> */}

                    <this.DynamicDropDownMenu stop="arrival" />
                    
                    <input className="NewRideFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default NewRide;

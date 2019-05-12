import React, { Component } from 'react';

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

                    <label className="NewRideFormInput">Pick your departure</label>
                    <select name="departure" value={this.state.departure} onChange={this.handleChange}>
                        <option value='ChicagoToChampaign'>Chicago to Champaign</option>
                        <option value='ChampaignToChicago'>Champaign to Chicago</option>
                    </select>

                    <label className="NewRideFormInput">Pick your destination</label>
                    <select name="arrival" value={this.state.arrival} onChange={this.handleChange}>
                        <option value='ChicagoToChampaign'>Chicago to Champaign</option>
                        <option value='ChampaignToChicago'>Champaign to Chicago</option>
                    </select>
                    
                    <input className="NewRideFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default NewRide;

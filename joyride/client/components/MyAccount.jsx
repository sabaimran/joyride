import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LocationConstants from './LocationConstants.ts';
import DynamicRides from './DynamicRides';

import request from 'request';

/**
 * Page for managing user account
 */
class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: true,
            user: null,
            rides: []
        };

        this.signedInUser();
    }

    /**
     * See if user is signed in. If so, open the new ride form. If not, prompt them to sign in.
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
                    self.setState(state => ({
                        loggedin: false
                    }));
            }
            return response.json();
        }).then(function(signinResult) {
            // If there is a user signed in, populate the fisrt and last name fields.
            if(signinResult.success) {
                self.setState({
                    user: signinResult.founduser
                }, () => {
                    self.getRidesByUserID();
                });
            }
        }).catch(function(err) {
            console.log('Request failed', err);
        });

    }

    /**
     * Get all rides for this user. TODO: check if the API endpoint works and make the rendering.
     */
    getRidesByUserID() {
        // Populate the main page with the list of rides in a specific direction.
        var uri = `http://localhost:${process.env.PORT}/ride/bydriver`;
        uri += `?driverID=${this.state.user._id}`;

        console.log(uri);

        const displayRides = [];
        const self = this;

        request.get(uri, function (error, response, body) {
            // Print the error if one occurred
            if (error) {
                console.error('error:', error); 
            }
            // Print the response status code if a response was received
            console.log('statusCode:', response && response.statusCode); 
            // Print the HTML for all rides query.
            console.log('body:', body); 

            const rides = JSON.parse(body);

            // Convert to array in order to use nice syntax. make sure to follow the schema pattens.
            for (const ride of rides) {

                var departureConsts, destinationConsts;
                if (ride.category == "ChicagoToChampaign") {
                    departureConsts = LocationConstants.ChicagoPlaces;
                    destinationConsts = LocationConstants.ChampaignPlaces;
                } else {
                    departureConsts = LocationConstants.ChampaignPlaces;
                    destinationConsts = LocationConstants.ChicagoPlaces;
                }

                var departurePlace, destinationPlace;
                departurePlace = (departureConsts[ride.departure]).place;
                destinationPlace = (destinationConsts[ride.destination]).place;

                displayRides.push({
                    key: ride._id,
                    driverID: ride.driverID,
                    departure: departurePlace,
                    destination: destinationPlace,
                    date: ride.date
                })
            }

            self.setState(state => ({
                rides: displayRides
            }));

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
            const uri = `http://localhost:${process.env.PORT}/user`;

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
     * The user's account page.
     */
    render() {
        /**
         * If no user is logged in, then redirect to the login screen (Or signup?).
         */
        if (!this.state.loggedin) {
            return (
                <Redirect to="/login"/>
            );
        }

        if (this.state.user !== null) {
            return (
                <div className="UserAccountContainer">
                    <h1>Hi, {this.state.user.firstname} </h1>
                    <p>{this.state.user.aboutme}</p>
                    <p id="userRides">I'm driving!</p>
                    <DynamicRides rides={this.state.rides}/>
                </div>
            )
        } else {
            return (
                <div className="UserAccountContainer">
                    Loading user content :)
                </div>
            );
        }
    }
}

export default MyAccount;

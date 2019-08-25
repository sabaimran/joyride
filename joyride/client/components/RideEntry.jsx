import React, { Component } from 'react';
import request from 'request';
import { Redirect } from 'react-router-dom';

/**
 * The basic architecture for displaying a ride in Listings.jsx.
 */
class RideEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            userNotFound: false,
            shouldShowEdit: this.props.shouldShowEdit,
            editRide: false
        }

        this.showDate = this.showDate.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.handleEditRide = this.handleEditRide.bind(this);
        this.getUser(this.props.driverID);
    }

    /**
     * Prettify the date a little bit.
     */
    showDate() {

        const date = new Date(this.props.date);

        const hours = date.getHours();

        const minutes = (date.getMinutes()<10 ? '0' : '')+date.getMinutes();

        return (
            <div className="RideEntryField" id="datestamp">{hours}:{minutes}</div>
        );
    }

    showEdit() {
        if (this.state.shouldShowEdit) {
            return (
                <button className="editButton" onClick={this.handleEditRide} type="button">Edit</button>
            );
        }
    }

    handleEditRide() {
        this.setState({
            editRide: true
        });
    }
    
    /**
     * From the ride object, extract the driver's ID to look them up in the DB and get relevant infos.
     */
    getUser(driverID) {
        var uri = `http://localhost:${process.env.PORT}/user/${driverID}`;

        const self = this;

        request.get(uri, function (error, response, body) {
            // Print the error if one occurred
            if (error) {
                // Should the ride be deleted?
                console.error('error:', error); 
                self.setState({
                    userNotFound: true
                });
            } else if (response.statusCode === 200) {
                self.setState({
                    user: JSON.parse(body)
                });

                console.log("user in ride entry:" + self.state.user.firstname);
            }
        });
    }

    /**
     * Render a listing.
     */
    render() {
        // TODO: add a button to toggle the mode to edit. This button will only be visible if the driver id matches the userid. Should the edit button show up on the listings page? What should the edit page look like? Like the listing or like the new ride entry page? Answer: more like the new ride entry page. 
        if (this.state.userNotFound) {
            return(null);
        } else if (this.state.editRide) {
            return (
                <Redirect to={{
                    pathname: '/editride',
                    state: { firstname: this.state.user.firstname }
                }} />
            )
        } else {
            return (
                <div className="RideEntry">
                    <h1 className="RideEntryField">{this.state.user.firstname+" "+this.state.user.lastname}</h1>
                    <this.showDate/>
                    <this.showEdit />
                    <div className="RideEntryField">Pickup: {this.props.departure}</div>
                    <div className="RideEntryField">Drop-off: {this.props.destination}</div>
                </div>
            );
        }
    }
}

export default RideEntry;

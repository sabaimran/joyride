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
        this.showButton = this.showButton.bind(this);
        this.showPrice = this.showPrice.bind(this);
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
            <td className="RideEntryField" id="datestamp">{hours}:{minutes}</td>
        );
    }

    /**
     * Show the button (edit or book) of ride if applicable.
     */
    showButton() {
        if (this.state.shouldShowEdit) {
            return (
                <td>
                    <button className="editButton" onClick={this.handleEditRide} type="button">Edit</button>
                </td>
            );
        } else {
            return null;
        }           
    }

    /**
     * Render price of ride.
     */
    showPrice() {
        if(this.props.price == 0) {
            return(
                <td>
                    <p className="RideEntryFieldPrice">
                        free
                    </p>
                </td>
            );
        } else {
            return(
                <td>
                    <p className="RideEntryFieldPrice">
                        ${this.props.price}
                    </p>
                </td>
            )
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
                    state: { rideID: this.props.rideID }
                }} />
            )
        } else {
            return (
                <table className="RideEntry">
                    <tbody>
                        <tr>
                            <td className="RideEntryName">{this.state.user.firstname+" "+this.state.user.lastname}</td>
                            <this.showDate/>
                        </tr>
                        <tr>
                            <td>
                                <ul className="RideEntryField">
                                    <li className="RideEntryField">Pickup: {this.props.departure}</li>
                                    <li className="RideEntryField">Drop-off: {this.props.destination}</li>
                                </ul>
                            </td>
                            <this.showPrice />
                        </tr>
                        <tr>
                            <td>
                                <p className="RideEntryFieldNumber">
                                    {this.props.numberOfSeats}
                                </p>
                            </td>
                            <this.showButton/>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
}

export default RideEntry;

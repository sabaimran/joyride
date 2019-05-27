import React, { Component } from 'react';

/**
 * The basic architecture for displaying a ride in Listings.jsx.
 */
class RideEntry extends Component {
    constructor(props) {
        super(props);

        this.showDate = this.showDate.bind(this);
    }

    /**
     * Prettify the date a little bit.
     */
    showDate() {

        const date = new Date(this.props.date);
        // console.log(date);
        // console.log(date.toLocaleDateString('en-US'));
        // console.log(date.toLocaleString('en-US'));
        // console.log(date.toLocaleTimeString('en-US'));

        const year = date.getFullYear();

        const month = date.getMonth();

        const day = date.getDay();

        const hours = date.getHours();

        const minutes = date.getMinutes();

        return (
            <div className="RideEntryField" id="datestamp">{date.toLocaleString()}</div>
        );
    }

    /**
     * Render a listing.
     */
    render() {
        return (
            <div className="RideEntry">
                <h1 className="RideEntryField">{this.props.name}</h1>
                <p className="RideEntryField">Pickup: {this.props.departure}</p>
                <p className="RideEntryField">Drop-off: {this.props.destination}</p>
                {/* <p className="RideEntryField">{this.props.date.toString()}</p> */}
                <this.showDate/>
            </div>
        );
    }
}

export default RideEntry;

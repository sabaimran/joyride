import React, { Component } from 'react';

/**
 * The basic architecture for displaying a ride in Listings.jsx.
 */
class RideEntry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="RideEntry">
                <h1 className="RideEntryField">{this.props.name}</h1>
                <p className="RideEntryField">Pickup: {this.props.departure}</p>
                <p className="RideEntryField">Drop-off: {this.props.destination}</p>
                <p className="RideEntryField">{this.props.date.toString()}</p>
            </div>
        );
    }
}

export default RideEntry;

import React, { Component } from "react";

import RideEntry from './RideEntry.jsx';

/**
 * Populate ride objects in to the listing page.
 */
class DynamicRides extends Component {

    constructor(props) {
        super (props);
    }

    render () {
        return (
            <div>
                {this.props.rides.map((ride, index) => (
                    <RideEntry key={index} driverID={ride.driverID} departure={ride.departure} destination={ride.destination} date={ride.date}/>
                ))}
            </div>
        );
    }
}

export default DynamicRides;

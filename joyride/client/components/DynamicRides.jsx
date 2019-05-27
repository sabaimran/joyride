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
                <ul>
                    {this.props.rides.map((rides, index) => (
                        <RideEntry key={index} name={rides.firstname+` `+rides.lastname} departure={rides.departure} destination={rides.destination} date={rides.date}/>
                    ))}
                </ul>
            </div>
        );
    }    
}

export default DynamicRides;

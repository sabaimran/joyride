import React, { Component } from "react";

import RideEntry from './RideEntry.jsx';

/**
 * Populate ride objects in to the listing page.
 */
class DynamicRides extends Component {

    constructor(props) {
        super (props);
        this.withoutTime = this.withoutTime.bind(this);
        this.RidesByDate = this.RidesByDate.bind(this);
    }

    /**
     * Remove the time of a date for ease of comparison.
     * @param {Date to strip time of} date 
     */
    withoutTime(date) {
        var strippedDate = new Date(date);
        strippedDate.setHours(0, 0, 0, 0);
        return strippedDate;
    }
    
    /**
     * Prepare cards of rides to render.
     */
    RidesByDate() {
        let rideGroups = [];
        if (this.props.rides.length > 0) {
            let startDate = this.withoutTime(this.props.rides[0].date);
            rideGroups.push(<h1 key={startDate}>{startDate.getMonth()+1} / {startDate.getDate()}</h1>)

            for (let ride of this.props.rides) {
                if (this.withoutTime(ride.date) > startDate) {
                    startDate = this.withoutTime(ride.date);
                    rideGroups.push(<h1 key={startDate}>{startDate.getMonth()+1} / {startDate.getDate()}</h1>)
                }
                rideGroups.push(
                    <RideEntry key={ride.key} driverID={ride.driverID} departure={ride.departure} destination={ride.destination} date={ride.date} shouldShowEdit={this.props.shouldShowEdit}/>
                );
            }
            return rideGroups;
        } else {
            return (
                <div id="NoRides">No rides yet!</div>
            );
        }
    }

    render () {
        return (
            <div>
                <this.RidesByDate />
            </div>
        );
    }
}

export default DynamicRides;

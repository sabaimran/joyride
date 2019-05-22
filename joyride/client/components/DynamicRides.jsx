import React, { Component } from "react";
import { IRideProps } from './RideInterfaces.ts';

import RideEntry from './RideEntry.jsx';

// class DynamicRides extends Component<IRideProps, any> {
class DynamicRides extends Component {

    constructor(props) {
        super (props);
    }

    render () {
        return (
            <div>
                <ul>
                    {this.props.rides.map((rides, index) => (
                        <RideEntry key={index} name={rides.name} departure={rides.departure} destination={rides.destination} time={rides.time}/>
                    ))}
                </ul>
            </div>
        );
    }    
}

export default DynamicRides;

import React, { Component } from "react";
import { IRideProps } from './RideInterfaces.ts';

import RideEntry from './RideEntry.jsx';

class DynamicRides extends Component<IRideProps, any> {

    constructor(props: IRideProps) {
        super (props);
    }

    render () {
        return (
            <div>
                <ul>
                    {this.props.rides.map((rides, index) => (
                        // <li key={index}>hi {rides.name} from {rides.departure} to {rides.destination} on {rides.time.toString()}</li>
                        <RideEntry key={index} name={rides.name} departure={rides.departure} destination={rides.destination} time={rides.time}/>
                    ))}
                </ul>
            </div>
        );
    }    
}

export default DynamicRides
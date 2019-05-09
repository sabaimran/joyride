import React, { Component } from 'react';
import { IRide } from './RideInterfaces.ts';

class RideEntry extends Component<IRide, any> {
    constructor(props: IRide) {
        super(props);
    }

    render() {
        return (
            <div className="RideEntry">
                <h1 className="RideEntryField">{this.props.name}</h1>
                <p className="RideEntryField">Pickup: {this.props.departure}</p>
                <p className="RideEntryField">Drop-off: {this.props.destination}</p>
                <p className="RideEntryField">{this.props.time.toString()}</p>
            </div>
        );
    }
}

export default RideEntry;

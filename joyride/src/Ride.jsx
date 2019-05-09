/// <reference path="react.d.ts" />

import React, { Component } from "react";

interface IRide {
    name: string;
}

interface IRideProps {
    rides: IRide[]
}

class DynamicRides extends Component<IRideProps, any> {

    constructor(props: IRideProps) {
        super (props);
    }

    render () {
        return (
            <div>
                <ul>
                    {this.props.rides.map((rides) => (
                        <li>{rides.name}</li>
                    ))}
                </ul>
            </div>
        );
    }    
}

export default DynamicRides
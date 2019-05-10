import React, { Component } from 'react';

class NewRide extends Component {
    constructor() {
        super();
        // const button = document.getElementById("new-form-button");
        // button.style.display = 'none';
        this.setState = {
            hideNewRideButton: true
        }
    }

    render() {
        return (
            <div>
                <p>This is a new ride form, hello.</p>
            </div>
        );
    }
}

export default NewRide;

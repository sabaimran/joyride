import React, { Component } from 'react';

/**
 * A Login form for returning users.
 */
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Errors = this.Errors.bind(this);
    }

    /**
     * Update state when values are changed.
     * @param {*} event 
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    /**
     * When user submits the form.
     * 
     * @TODO sanitize the data, notify user of errors, and make a post request here to create a new user. 
     */
    handleSubmit(event) {
        event.preventDefault();
        console.log('submit handler');
        const illinoisEmail = /^\w+@illinois+?\.edu$/;

        // First make sure appropriate data is passed in.

        if (!this.state.email ||
            !this.state.email.match(illinoisEmail)) {
            this.setState({
                errorMessage: 'Must enter a valid @illinois.edu email address.'
            });
        } else if (!this.state.password) {
            this.setState({
                errorMessage: 'Enter in your password!'
            })
        } else {
            console.log('post request to login returning user');
            this.setState({
                errorMessage: ''
            });
            // Make the post request
            const uri = `http://localhost:${process.env.PORT}/user/login`;

            const formdata = JSON.stringify(this.state);
            console.log('starting post request');

            fetch(uri, {
                method: "POST",
                body: formdata,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                // If successful.
                console.log('logged in');
                console.log(response.token);
                console.log(response.body.token);
                return response.json();
            }).catch(function(err) {
                console.log('Request failed', err);
            });
        }
    }

    /**
     * Display errors if there are any.
     */
    Errors() {
        return (
            <div className="Form-Errors">{this.state.errorMessage}</div>
        )
    }

    render () {
        /**
         * @TODO change these classNames to differentiate from the reigstration form
        */
        return (
            <div className="UserAccountContainer">
                <h1 className="formInput">Welcome back!</h1>
                <this.Errors />
                <form className="UserAccountForm" onSubmit={this.handleSubmit}>
                    <label className="UserAccountFormInput">Email Address</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

                    <label className="UserAccountFormInput">Password</label>
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />

                    <input className="UserAccountFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
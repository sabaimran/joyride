import React, { Component } from 'react';
import { nextTick } from 'q';

/**
 * A Login form for returning users.
 * @TODO redirect to main page on login.
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
        // on login, window.location.reload(); so that app.jsx can show the correct menu options.
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
        const illinoisEmail = /^\w+@illinois+?\.edu$/;

        var errorMessage = '';

        // First make sure appropriate data is passed in.
        if (!this.state.email ||
            !this.state.email.match(illinoisEmail)) {
                errorMessage = 'Must enter a valid @illinois.edu email address.';
        } else if (!this.state.password) {
            errorMessage = 'Enter in your password!';
        } else {
            // Make the post request
            const uri = `http://localhost:${process.env.PORT}/user/login`;

            const formdata = JSON.stringify(this.state);
            // remove this line when cleaning out code. 
            self=this;

            fetch(uri, {
                method: "POST",
                body: formdata,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                console.log('logged in');
                if (response.status == 404) {
                    errorMessage = "Sorry, we couldn't find someone with that email and password.";
                    throw new Error("User not found.");
                } else {
                    return response.json();
                }
            }).then(function(jsonresponse) {
                // If successful.
                console.log(jsonresponse.token);
            }).catch(function(err) {
                self.setState({
                    errorMessage: errorMessage
                });
                console.log('Request failed', err);
            });
        }

        this.setState({
            errorMessage: errorMessage
        });
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
            <div className="LoginContainer">
                <h1 className="formInput">Welcome back!</h1>
                <this.Errors />
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    <label className="LoginFormInput">Email Address</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

                    <label className="LoginFormInput">Password</label>
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />

                    <input className="LoginFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
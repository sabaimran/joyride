import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * A Login form for returning users.
 * @TODO redirect to main page on login.
 */
class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            loggedIn: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Errors = this.Errors.bind(this);
        this.signedInUser();
        // on login, window.location.reload(); so that app.jsx can show the correct menu options.
    }

    /**
     * See if user is signed in. If so, open the new ride form. If not, prompt them to sign in.
     */
    signedInUser() {
        const uri = `http://localhost:${process.env.PORT}/user/checktoken`;

        const self = this;

        fetch(uri, {
            method: "POST"
        }).then(function(response) {
            // Check if login worked. If not, then show not logged in. 
            if (response.status == 404 || 
                response.status == 401) {
                    self.setState(state => ({
                        loggedIn: false
                    })
                );
            }
            return response.json();
        }).then(function(signinResult) {
            // If there is a user signed in, set loggedIn to true and reload the page.
            if(signinResult.success) {
                self.setState(state => ({
                    loggedIn: true
                }));
            }
        }).catch(function(err) {
            console.log('Request failed', err);
        });

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
                if (response.status !== 200) {
                    errorMessage = "Sorry, we couldn't find someone with that email and password.";
                    throw new Error("User not found.");
                } else {
                    return response.json();
                }
            }).then(function(jsonresponse) {
                // If successful.
                console.log(jsonresponse.token);
                self.setState(state => ({
                    loggedIn: true
                }));
                window.location.reload();

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
        if (this.state.loggedIn) {
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div className="LoginContainer">
                <h1 className="formInput">Welcome back!</h1>
                <this.Errors />
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    <label className="LoginFormInput">Email Address</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

                    <label className="LoginFormInput">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

                    <input className="LoginFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Login;


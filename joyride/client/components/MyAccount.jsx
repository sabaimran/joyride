import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Page for managing user account
 */
class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: true,
            user: null
        };

        this.signedInUser();
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
                        loggedin: false
                    }));
            }
            return response.json();
        }).then(function(signinResult) {
            // If there is a user signed in, populate the fisrt and last name fields.
            if(signinResult.success) {
                self.setState(state => ({
                    user: signinResult.founduser
                }));
            }
        }).catch(function(err) {
            console.log('Request failed', err);
        });

    }

    /**
     * Update state when values are changed.
     * @param {} event 
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
     * Handle the form submit by creating a post request.
     */
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.firstname || 
            !this.state.lastname) {
                this.setState({
                    errorMessage: "Need to fill in a name!"
                });
        } else {
            // Make the post request
            const uri = `http://localhost:${process.env.PORT}/user`;

            // Get user id and send it in with the post request. 

            const formdata = JSON.stringify(this.state);

            fetch(uri, {
                method: "POST",
                body: formdata,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                return response.json();
            }).catch(function(err) {
                console.log('Request failed', err);
            });
        }
    }

    /**
     * The user's account page.
     */
    render() {
        /**
         * If no user is logged in, then redirect to the login screen (Or signup?).
         */
        if (!this.state.loggedin) {
            return (
                <Redirect to="/login"/>
            );
        }

        if (this.state.user !== null) {
            return (
                <div className="UserAccount">
                    <h1>Hi, {this.state.user.firstname} </h1>
                    <p>{this.state.user.aboutme}</p>
                </div>
            )
        } else {
            return (
                <div className="UserAccount">
                    Loading user content :)
                </div>
            );
        }
    }
}

export default MyAccount;

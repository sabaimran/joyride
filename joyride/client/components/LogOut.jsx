import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LogOut extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loggedin: true
        };

        // on login, window.location.reload(); so that app.jsx can show the correct menu options.
        this.signOut();
    }

    signOut() {
        // Make the post request
        const uri = `http://localhost:${process.env.PORT}/user/logout`;

        self=this;

        fetch(uri, {
            method: "POST"
        }).then(function(response) {
            console.log('logged out');
            self.setState({
                loggedin: false
            });
            return response.json();
        });
    }

    render () {
        /**
         * @TODO change these classNames to differentiate from the reigstration form
        */

        if (!this.state.loggedin) {
            return (
                <Redirect to="/"/>
            );
        }
        return (
            <div className="LogoutScreen">
                Logging Out
            </div>
        );
    }
}

export default LogOut;

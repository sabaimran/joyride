import React, { Component } from 'react';

/**
 * A registration form for new users.
 */
export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            license: '',
            aboutme: ''
        };

        this.handleChange = this.handleChange.bind(this);
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
        alert("hello");
    }

    render () {
        return (
            <div className="UserAccountContainer">
                <h1 className="formInput">Who are you?</h1>
                <form className="UserAccountForm" onSubmit={this.handleSubmit}>
                    <label className="UserAccountFormInput">First name</label>
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />

                    <label className="UserAccountFormInput">Last name</label>
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} />

                    <label className="UserAccountFormInput">Email Address</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

                    <label className="UserAccountFormInput">Password</label>
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />

                    <label className="UserAccountFormInput">About yourself!</label>
                    <textarea type="text" rows="5" name="aboutme" value={this.state.aboutme} onChange={this.handleChange} />
                    
                    <input className="UserAccountFormInput" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
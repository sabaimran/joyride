import React, { Component } from 'react';

/**
 * The about page.
 */
export default class About extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="AboutPage">
                <p className="AboutPage"> 
                    Welcome to JoyRide! I am a 2018 UIUC alumnus and I developed this website as a side project so that UIUC students could have an easy-to-use rideshare service for getting to and from campus. It's simple: drivers post their ads and riders reach out. When we offer rides to others, we make a small step towards building a community and reducing our net carbon footprint. I wanted to building something that would help to make the world a better, friendlier place.
                    <br/>                    
                    If you're using this service, uphold the core values of respect, kindness, and integrity. For now, this site is free to use.
                    <br/>                    
                    To get started, sign up using your @illinois.edu email address. Then, you can offer up a ride from some predetermined geo points or try to hop in someone else's car! Take care and enjoy, friends.
                    <br/>
                    <br/>
                    Contact me for any suggestions, questions, or concerns:
                    <br/>
                    Saba Imran
                    <br/>
                    sabaimran48@gmail.com
                    <br/>
                    630-432-9912
                </p>
            </div>
        )
    }
}
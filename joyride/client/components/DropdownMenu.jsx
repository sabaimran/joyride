import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**
 * A dropdown menu to make the mobile version more appealing. TODO: add the NavLinks here as a vertical list.
 */
class DropdownMenu extends Component {
    constructor() {
      super();
  
      this.handleClick = this.handleClick.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
  
      this.state = {
        dropdownVisible: false
      };
    }
  
    handleClick() {
      if (!this.state.dropdownVisible) {
        // attach/remove event handler
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
  
      this.setState(prevState => ({
        dropdownVisible: !prevState.dropdownVisible,
      }));
    }
    
    handleOutsideClick(e) {
      // ignore clicks on the component itself
      if (this.node.contains(e.target)) {
        return;
      }
      
      this.handleClick();
    }
  
    render() {
        console.log('width of scrn ',this.props.width);
        if (this.props.width > 415) {
            return ( null );
        } else {
            return (
                <div className="dropdown-menu-container" ref={node => { this.node = node; }}>
                    <button onClick={this.handleClick} >
                        Dropdown menu.
                    </button>
                    {this.state.dropdownVisible && (
                        <nav className="dropdownMenu">
                            <li className="listitemDropdown" hidden={!this.props.isUserSignedIn}>
                                <Link className="menuOptionMobile" to="/myaccount" hidden={!this.props.isUserSignedIn}>
                                    My Account
                                </Link>
                            </li>
                            <li className="listitemDropdown" hidden={!this.props.isUserSignedIn}>
                                <Link className="menuOptionMobile" to="/newRide" hidden={!this.props.isUserSignedIn}>
                                    New Ride
                                </Link>
                            </li>
                            <li className="listitemDropdown" hidden={this.props.isUserSignedIn}>
                                <Link className="menuOptionMobile" to="/register">
                                    Sign up
                                </Link>
                            </li>
                            <li className="listitemDropdown">
                                <Link className="menuOptionMobile" to="/about">
                                    About me
                                </Link>
                            </li>
                            <li className="listitemDropdown" hidden={this.props.isUserSignedIn}>
                                <Link className="menuOptionMobile" to="/login" hidden={this.props.isUserSignedIn}>
                                    Log in
                                </Link>
                            </li>
                            <li className="listitemDropdown" hidden={!this.props.isUserSignedIn}>
                                <Link className="menuOptionMobile" to="/logout" hidden={!this.props.isUserSignedIn}>
                                    Log out
                                </Link>
                            </li>
                        </nav>
                    )}
                </div>
            );
        }
    }
}

export default DropdownMenu;
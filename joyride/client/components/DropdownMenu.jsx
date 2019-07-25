import React, { Component } from 'react';

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
        if (this.props.width > 400) {
            return ( null );
        } else {
            return (
                <div className="dropdown-menu-container" ref={node => { this.node = node; }}>
                    <button onClick={this.handleClick} >
                        Dropdown menu.
                    </button>
                    {this.state.dropdownVisible && (
                        <div className="dropdown-menu">
                        Drop it.
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default DropdownMenu;
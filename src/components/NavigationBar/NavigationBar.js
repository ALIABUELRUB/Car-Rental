import React, { Component } from 'react';
import { Navbar, Nav, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import RenatlCarLogo from '../../assets/images/RentACarLogo2.png';
import NavigationItems from './NavigationItems/NavigationItems';

class Navigationbar extends Component {


    render() {

        return (
            <div >
                <Navbar bg="dark" expand="sm"  >
                    <Navbar.Brand >
                        <Link to="/">
                            <Media tag="a" className="nav-link" href="/"  >
                                <img src={RenatlCarLogo} alt="CarLogo" height="50px" />
                            </Media>
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <NavigationItems />
                        </Nav>
                    </Navbar.Collapse>
                    {/* <NavigationItemsDropdown /> */}
                </Navbar>
                {this.props.children}
            </div>
        );
    }
}

export default Navigationbar;
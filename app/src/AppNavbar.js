import React,{Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem} from 'reactstrap';
import {Link} from "react-router-dom";

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state={isOpen: true};
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
            return <Navbar color="dark" dark-expand="md">
                <NavbarBrand tag={Link} to="/">Priyank Rege Groups</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink
                                href="http://priyankrege.com/">@priyankrege</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
    }


}

export default AppNavbar;
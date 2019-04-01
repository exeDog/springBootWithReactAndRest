import React,{Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem} from 'reactstrap';
import {Link} from "react-router-dom";

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state={isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
        return(
            <Navbar color="dark" dark-expand="md">
                <NavbarBrand tag={Link} to="/"></NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink
                                href="https://twitter.com/oktadev">@oktadev</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/oktadeveloper/okta-spring-boot-react-crud-example">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }


}

export default AppNavbar;
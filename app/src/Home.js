import React,{Component} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Link} from "react-router-dom";
import {Button, Container} from 'reactstrap';

class Home extends Component{
    render(){
        return(
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/groups">Manage</Link></Button>
                    <Button color="link"><Link to="/groups/new">Add New</Link></Button>
                    <Button color="link"><Link to="/users">Add New User</Link></Button>
                </Container>
            </div>
        )
    }
}

export default Home;
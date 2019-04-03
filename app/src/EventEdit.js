import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Container, InputGroup, InputGroupAddon} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {withRouter} from "react-router-dom";

class EventEdit extends Component{

    constructor(props) {
        super(props);
        this.state = {
            event: this.props.event,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit =  this.handleSubmit.bind(this);
    }


    handleChange(event){
        this.setState({event: event.target.value});

    }

    handleSubmit(event){
        event.preventDefault();
    }


    render() {

        const {event} = this.state;

        return <div>
            <InputGroup>
                <InputGroupAddon addonType='prepend'>Event</InputGroupAddon>
                <Input placeholder ='Enter the event details' value={event.description} name='description'/>
            </InputGroup>
        </div>
    }

}
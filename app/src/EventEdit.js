import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Container, InputGroup, Input, InputGroupAddon, Form, FormGroup} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {withRouter} from "react-router-dom";

class EventEdit extends Component{

    constructor(props) {
        super(props);
        this.state = {
           title: '',
            // date: Date.now(),
            description:  ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit =  this.handleSubmit.bind(this);
    }

    handleChange(event){
        const field = event.target.name;
        const stateCopy = Object.assign({},this.state.event);
        stateCopy[field] = event.target.value;
        this.setState(stateCopy);

    }

    async handleSubmit(event){
        event.preventDefault();
        const id = this.props.match.params.id;
        await fetch(`/api/event/${id}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        });

        this.props.history.push(`/groups/${id}`);
    }


    render() {

        const {title,date,description} = this.state;
        const id = this.props.match.params.id;

        return <Container>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                <InputGroup>
                    <InputGroupAddon addonType='prepend'>Event Title</InputGroupAddon>
                    <Input placeholder ='Enter the event details' value={title} id='title' name='title' type="text" onChange={this.handleChange}/>
                </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                    <InputGroupAddon addonType='prepend'>Event Description</InputGroupAddon>
                    <Input placeholder ='Enter the event details' value={description} id='description' name='description' type="textarea" onChange={this.handleChange}/>
                </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Button type='submit' color='primary'>Submit</Button>{' '}
                    <Button color="secondary" tag={Link} to={`/groups/${id}`}>Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    }

}

export default withRouter(EventEdit);
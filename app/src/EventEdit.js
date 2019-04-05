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
            description:  '',
            attendees: [],
            selectedUsers: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit =  this.handleSubmit.bind(this);
        this.addToUsers =  this.addToUsers.bind(this);
    }

    async componentDidMount(){

        await fetch(("/api/users")).then(response => response.json()).then(data => this.setState({attendees: data}));
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

    addToUsers(event){
        const userList  = [];
        userList.push(event.target.value);
        this.setState({selectedUsers: userList});
    }


    render() {

        const {title, attendees, description} = this.state;
        const id = this.props.match.params.id;

        const selectOptions = attendees.map(att => <option key={att.id} value={att}>{att.name}</option>);

        return <Container>
            <AppNavbar/>
            <br/>
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
                <InputGroup>
                    <InputGroupAddon addonType='prepend'>Event Attendees</InputGroupAddon>
                    <Input id='attendees' name='attendees' type="select" onChange={this.addToUsers}>
                        {selectOptions}
                    </Input>
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
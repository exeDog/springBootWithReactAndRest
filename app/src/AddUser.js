import React,{Component} from 'react';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {Container, Button, Form, FormGroup, Jumbotron, Label, Input, Table} from 'reactstrap';

class AddUser extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            users: [],
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    componentDidMount() {
        this.refreshData();
    }

    clearFields(){
        this.state.name = '';
        this.state.email = '';
    }

    handleInput(event){
        const newState =  {...this.state};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    async handleSubmit(event){
        event.preventDefault();
        await fetch("/api/users",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...{},name: this.state.name,email: this.state.email}),
        }).then(res => {this.clearFields();this.refreshData()});
    }

    async refreshData(){
        await fetch("/api/users").then(response => response.json())
            .then(data => this.setState({users: data}));
    }

    render() {

        const {name,email, users} =  this.state;

        const tableData = users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td></tr>);

        return <Container>
            <Jumbotron>
                Add A User
            </Jumbotron>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" value={name} onChange={this.handleInput}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" value={email} onChange={this.handleInput}/>
                </FormGroup>
                <FormGroup>
                    <Button color="success" type="submit">Submit</Button>
                </FormGroup>
            </Form>

            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>

            <Button color="link" tag={Link} to="/groups">Go To Groups</Button>
        </Container>
    }
}

export default withRouter(AddUser);
import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {Container,Table, Button} from 'reactstrap';

class ShowEvents extends Component{

    constructor(props) {
        super(props);
        this.state = {
            events : [],
        };
    }

    async componentDidMount(){
        const id  =  this.props.id;
        await fetch(`/api/event/${id}`)
            .then(response => response.json())
            .then(data => this.setState({events: data}))
            .catch(err => console.log(err));
    }

    render() {

        const {events} = this.state;

        const data = events.map(event => {
            return(
             <tr key={event.id}>
                 <td style={{whiteSpace: 'nowrap'}}>{event.title}</td>
                 <td>{event.date}</td>
                 <td>{event.description}</td>
             </tr>
            )
        });

        return <Container>
            <Table>
                <thead>
                <tr>
                    <th width="20%">Title</th>
                    <th width="20%">Date</th>
                    <th width="40%">Description</th>
                </tr>
                </thead>
                <tbody>
                {data}
                </tbody>
            </Table>

            <Button color='success' tag={Link} to={`/events/${this.props.id}`}>Add Event</Button>
        </Container>

    }
}

export default ShowEvents;
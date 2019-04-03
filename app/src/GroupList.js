import React,{Component} from 'react';
import {Button,ButtonGroup,Table,Container} from 'reactstrap';
import {Link} from "react-router-dom";
import AppNavbar from './AppNavbar';

class GroupList extends Component {

    constructor(props) {
        super(props);
        this.state = {groups:[],isLoading:true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: false});

        fetch(`/api/group`)
            .then(response => response.json())
            .then(data => this.setState({groups:data,isLoading:false}))
            .catch(err => console.log(err));

    }

    async remove(id){

        await fetch(`/group/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
           let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
           this.setState({groups: updatedGroups});
        });
    }

    render(){
        const {groups, isLoading} = this.state;

        if(isLoading)return <p>Loading...</p>

        const groupList = groups.map(group => {
            const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
            return <tr key={group.id}>
                <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                <td>{address}</td>
                <td>
                    {group.events.map(event =>{
                        return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(event.date))}: {event.title}</div>
                    })
                    }
                </td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={`/groups/${group.id}`}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return(
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
                    </div>
                    <h3>Events</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Description</th>
                            <th>Events</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

export default GroupList;
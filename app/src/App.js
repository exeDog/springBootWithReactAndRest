import React, { Component } from 'react';
import './App.css';
import GroupList from './GroupList';
import Home from './Home';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import GroupEdit from './GroupEdit';
import EventPage from './EventEdit'
import UserPage from  './AddUser';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/groups' exact={true} component={GroupList}/>
            <Route path='/groups/:id' component={GroupEdit}/>
            <Route path='/events/:id' component={EventPage}/>
            <Route path='/users' exact={true} component={UserPage}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
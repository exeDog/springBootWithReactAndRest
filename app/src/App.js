import React, { Component } from 'react';
import './App.css';
import GroupList from './GroupList';
import Home from './Home';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/groups' exact={true} component={GroupList}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
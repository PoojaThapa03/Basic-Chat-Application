import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/Signup';
import Welcome from './Pages/WelcomePage/Welcome';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component = {Home}/>
          <Route path = "/signup" component = {Signup}/>
          <Route path = "/welcome" render ={props => <Welcome {...props} />}/>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
      
    )
  }
}

export default App
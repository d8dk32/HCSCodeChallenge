import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
    }
  }

  authResponseHandler = (authResponse) => {

    this.setState((state) => {
     return {
       authenticated: authResponse.authenticated
      }
    });

    alert('login successful -  ' + JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() =><Login authResponseHandler={this.authResponseHandler} />}/>
        </Switch>
      </div>
    );
  }
}

export default App;

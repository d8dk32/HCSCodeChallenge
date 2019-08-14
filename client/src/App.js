import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Tasks from './Tasks';

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
    this.props.history.push("/tasks")
  }

  logout = () => {
    this.setState (state => {
      return {
        authenticated: false
      }
    });
    this.props.history.push("/")
  }

  render() {
    const {authenticated} = this.state;
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => <Login authResponseHandler={this.authResponseHandler} />}/>
          <Route exact path='/tasks' render={() => <Tasks auth={authenticated} logout={this.logout}/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

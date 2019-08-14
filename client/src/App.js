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
      username: ""
    }
  }

  //handles the response from the login endpoint
  //this method is passed into the login page component and called from the Login button's onClick callback
  //after a successful logging-in
  authResponseHandler = (authResponse) => {

    this.setState((state) => {
     return {
       authenticated: authResponse.authenticated,
       username: authResponse.username
      }
    });
    this.props.history.push("/tasks")
  }

  //click handler for the logout button. passed as a prop into the Tasks page and used a callback there
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
    const {username} =  this.state;
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => <Login authResponseHandler={this.authResponseHandler} />}/>
          <Route exact path='/tasks' render={() => <Tasks auth={authenticated} user={username} logout={this.logout}/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

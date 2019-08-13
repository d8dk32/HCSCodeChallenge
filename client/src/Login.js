import React, { Component } from 'react';

class Login extends Component {

    // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      errorState: true
    }
  }

  // Retrieves the list of items from the Express app
  authenticate = () => {
    const {authResponseHandler} = this.props;
    const userInput = document.querySelector("input[name='username']");
    const passInput = document.querySelector("input[name='password']");

    const data = {
      username: userInput.value,
      password: passInput.value
    }
    authResponseHandler(true);
    /*fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))*/
  }

  handleLogin = () => {    
    const userInput = document.querySelector("input[name='username']");
    const passInput = document.querySelector("input[name='password']");

    console.log(userInput.value + " " + passInput.value);
    if(userInput.value === "" || passInput.value === "") {
      this.setState((state) => {
        return {errorState: false};
      });
    }
    else {
      this.setState((state) => {
        return {errorState: true};
      });
      this.authenticate();
    }
  }

  render() {
    const {errorState} = this.state;
    return (
    <div className="App">
      <h1>Login</h1>
      <div> Enter Username: <input type="text" name="username"></input></div>
      <div> Enter Password: <input type="text" name="password"></input></div>
      <div hidden={errorState} style={{color:'red'}} >Username and Password are required.</div>
      <div> <button type="button" onClick={this.handleLogin}>Login</button></div>
    </div>
    );
  }
}
export default Login;

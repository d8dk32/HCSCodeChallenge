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

    const payload = {
      username: userInput.value,
      password: passInput.value
    };

    const fetchParams = {
      headers: {
        "content-type" : "application/json; charset=UTF-8"
      },
      body: JSON.stringify(payload),
      method: "POST"
    };

    fetch('/login', fetchParams)
    .then( data => {
      console.log(JSON.stringify(data, null, 2));
      return data.json()
    })
    .then( res => {
      console.log(JSON.stringify(res, null, 2));
      if(res.authenticated === true)
        authResponseHandler(res);
      else
        alert("Username or password did not match any accounts.");
    })
    .catch( err => {
      alert("Error reaching the server");
    });

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

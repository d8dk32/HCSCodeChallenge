import React, { Component } from 'react';

class Login extends Component {

    // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {

    return (
    <div className="App">
      <h1>Login</h1>
      <div> Enter Username: <input type="text" name="username"></input></div>
      <div> Enter Password: <input type="text" name="password"></input></div>
      <br/>
      <div> <button type="button">Login</button></div>
    </div>
    );
  }
}
export default Login;

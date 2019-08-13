import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tasks extends Component {

    // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      name: "John Smith",
      tasks: ["eat", "sleep"]
    }
  }

  componentDidMount(){
    //make call to mongo endpt to retrieve tasks
  }

  addTask = () => {
    const taskText = document.querySelector("input[name='newTask']");
    this.setState( state => {
      return {
        tasks : [...state.tasks, taskText.value]
      }
    });
  }

  deleteTask = (taskText) => {
    this.setState( state => {
      return {
        tasks : state.tasks.filter( function(val) {
          return val !== taskText;
        })
      }
    });
  }  

  render() {
    const {name} = this.state;
    const {tasks} = this.state;
    const {auth} = this.props;
    const {logout} = this.props;
    if(auth){
      return (
      <div className="App">
        <h1>Hello, {name}</h1>
        <h3>Tasks</h3>
        <ul>
          {tasks.map(t => <li>{t}&nbsp;<button type="button" onClick={()=>this.deleteTask(t)}>Delete</button></li>)}
        </ul>
        <div class="taskAdder">
          <div>
            <h6>Add a Task</h6> 
            <input type="text" name="newTask"></input> 
            <button type="button" onClick={this.addTask}>Add</button>
          </div>
          <br/>
          <div>
          <button type="button" onClick={this.saveTaskList}>Save Tasks</button>
          <button type="button" onClick={logout}>Log out</button>
          </div>
        </div>
      </div>
      );
    } else {
      return (
      <div className="App">
        <h1>You are not an authorized user of this page</h1>
        <Link to="/">Go to Login Page</Link>
      </div>
      );
    }
  }
}
export default Tasks;

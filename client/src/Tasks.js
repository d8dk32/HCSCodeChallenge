import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tasks extends Component {

    // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      name: "",
      tasks: []
    }
  }

  componentDidMount(){
    //make call to mongo endpt to retrieve tasks
    const {user} = this.props;

    fetch(`/user/${user}`)
    .then( data => {
      return data.json()
    })
    .then( res => {
      this.setState( state => {
        return {
          name: res.name,
          tasks: res.tasks
        }
      });
    })
    .catch( err => {
      this.setState( state => {
        return {
          name: "Error finding user data. Please log out and try again",
          tasks: []
        }
      });
    });
  }

  //click handler for Task add button
  addTask = () => {
    const taskText = document.querySelector("input[name='newTask']");
    this.setState( state => {
      return {
        tasks : [...state.tasks, taskText.value]
      }
    });
  }

  //click handler for delete buttons. Deletes task with the same text as the task whose delete button was clicked.
  deleteTask = (taskText) => {
    this.setState( state => {
      return {
        tasks : state.tasks.filter( function(val) {
          return val !== taskText;
        })
      }
    });
  }
  
  //click handler for Save button. Makes call to save list endpoint, POSTs the current task list to it
  saveTaskList = () => {
    const {user} = this.props;

    const payload = {
      tasks: this.state.tasks
    };

    const fetchParams = {
      headers: {
        "content-type" : "application/json; charset=UTF-8"
      },
      body: JSON.stringify(payload),
      method: "POST"
    };

    fetch(`/updateTasks/${user}`, fetchParams)
    .then( data => {
      return data.json()
    })
    .then( res => {
      alert("Tasks updated!");
    })
    .catch( err => {
      alert("Error while updating tasks:  \n" + JSON.stringify(err, null, 2));
    });

  }

  render() {
    const {name} = this.state;
    const {tasks} = this.state;
    const {auth} = this.props;
    const {logout} = this.props;
    //return different JSX depending on whether or not the user is authenticated
    if(auth){
      //show the task list and add/save buttons
      return (
      <div className="App">
        <h1>Hello, {name}</h1>
        <h3>Tasks</h3>
        <ul>
          {tasks.map(t => <li>{t}&nbsp;<button type="button" onClick={()=>this.deleteTask(t)}>Delete</button></li>)}
        </ul>
        <div className="taskAdder">
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
      //show a message telling the user they are not allowed to be here and need to leave.
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

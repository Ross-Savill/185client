import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      message: null,
      username: "",
      passport: "",
      role: "",
    }
  }

  componentDidMount() {
    const url = 'https://vast-earth-81912.herokuapp.com/auth/users'
    axios.get(url)
      .then(res => {
        const users = res.data.data
        const message = res.data.message
        this.setState({ users, message })
      })
  }

  componentDidUpdate() {
    const url = 'https://vast-earth-81912.herokuapp.com/auth/users'
    axios.get(url)
      .then(res => {
        const users = res.data.data
        const message = res.data.message
        this.setState({ users, message })
      })
  }

  listUsers = () => {
    const userArray = this.state.users
    if(userArray){
      return (
        userArray.map((user, i) => <li><strong>User: </strong> {user.username} ({user.role}) <button id="edit" data-user={user._id}>Edit</button> <button id={user._id} onClick={this.deleteUser}>Delete</button></li>)
      )}
  }

  inputChange = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]:value }, ()=>{
    })
  }

  checkboxClick = (e) => {
    if(this.state.role === 'admin') {
      this.setState({ role: null })
    } else {
      this.setState({ role: 'admin' })
    }
  }

  addUser = (e) => {
    e.preventDefault()
    const { username, password, admin} = this.state
    axios.post('https://vast-earth-81912.herokuapp.com/auth/register', {
      username: username,
      password: password,
      role: admin
    })
    .then(this.setState({username: "", password: "", role: ""}))
  }

  deleteUser = (e) => {
    console.log(e.currentTarget.id)
    axios.delete('https://vast-earth-81912.herokuapp.com/auth/users', { body: {
        "_id": e.currentTarget.id
      }
    })
  }

  render() {
    return (
      <>
        <div id="crud-container">
          <h2>Users</h2>
          <hr />
          <h3>Current Users</h3>
          <p></p>
          {this.state.message && this.state.message}:
          <ul>
            {this.state.users? this.listUsers() : "Loading users..."}
          </ul>
          <hr />
          <h3>Add User</h3>
          <p></p>
          <form>
            <label htmlFor="username">Username: </label><br />
            <input type="text" id="username" onChange={this.inputChange}></input><br />
            <label htmlFor="password">Password: </label><br />
            <input type="text" id="password" onChange={this.inputChange}></input><br />
            <label htmlFor="admin">Admin: </label>
            <input type="checkbox" id="admin" onChange={this.checkboxClick}/><br />
            <button onClick={this.addUser}>Add User</button>
          </form>
        </div>
      </>
    )
  }
}

export default Users;
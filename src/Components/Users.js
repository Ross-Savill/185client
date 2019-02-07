import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';
import {ReactDOM} from "react-dom";
import {Redirect} from "react-router-dom"
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      message: null,
      username: "",
      password: "",
      role: "user",
      addError: null,
      showEdit: false,
      openEdit: true,
      user: {
        username: "",
        password: "",
        _id: 0
      },
      showAlert: false,
      alertMessageText: "",
    }
  }

  componentDidMount() {
    this.loadDatabase()
  }

  loadDatabase = () => {
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
        userArray.map((user, i) => <li><strong>{user.username}</strong> ({user.role}) <button className="btn btn-primary btn-sm" id="edit" onClick={ () => {this.openEdit(user)}} data-user={user._id}>Edit</button> {i != 0 ? <button className="btn btn-danger btn-sm" id={user._id} onClick={this.deleteUser}>Delete</button>:null}</li>)
      )}
  }

  inputChange = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]:value }, ()=>{
    })
  }

  checkboxClick = (e) => {
    if(this.state.role === 'admin') {
      this.setState({ role: 'user' })
    } else {
      this.setState({ role: 'admin' })
    }
  }

  addUser = (e) => {
    e.preventDefault()
    const { username, password, role} = this.state
    axios.post('https://vast-earth-81912.herokuapp.com/auth/register', {
      username,
      password,
      role
    })
      .then(res => {
        this.setState({addError: res.data.message})
      })
  }

  deleteUser = (e) => {
    e.preventDefault()
    const {id} = e.currentTarget
    axios.delete('https://vast-earth-81912.herokuapp.com/auth/users', {data: {'_id': id}})
  }

  changePassword = (e) => {
    e.preventDefault()
    const {id, password} = e.currentTarget
    axios.put('https://vast-earth-81912.herokuapp.com/auth/users', {data: {'_id': id, password}})
  }

  openEdit = (user) => {
    user.password=""
    this.setState({showEdit: true, user})

  }

  closeEdit = () => {
    this.setState({showEdit: false})
  }

  submitEdit = () => {
    const { user } = this.state;
    axios.put('https://vast-earth-81912.herokuapp.com/auth/users', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      if(response.data.success) {
        this.setState({showAlert:true, alertMessageText:response.data.message, showEdit:false})
      } else {
        this.setState({showAlert:true, alertMessageText:response.data.message})

      }
    })
  }

  messageBoxClose= () => {
    this.setState({showAlert:false})
  }

  messageBox = () => {
    return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right',}}
      open={this.state.showAlert}
      autoHideDuration={5000}
      onClose={this.messageBoxClose}
      message={<span id="message-id">{this.state.alertMessageText}</span>}
      />
    )
  }

  messageBoxOpen = () => {
    this.setState({alertMessage:true})
  }


  inputChangeEdit = (e) => {
      const { value } = e.currentTarget
      const { user } = this.state
      user.password = value
      console.log(user.password)
      console.log(user);
      this.setState({user})
    }

  editUser = () => {
    const { user } = this.state;
    console.log(user)
    return (
    <Dialog open={this.state.showEdit} onClose={this.closeEdit} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title"> </DialogTitle>
          <DialogContent>
            Change password for '{user.username}'
            <br/>
            <label htmlFor="password">Password: </label>
            <input type="text" id="password" onChange={this.inputChangeEdit}></input><br />

          </DialogContent>
          <DialogActions>
            <button className="btn btn-outline-primary btn-sm" onClick={this.closeEdit}>
              Close
            </button>
            <button className="btn btn-outline-primary btn-sm" onClick={this.submitEdit} autoFocus>
              Save
            </button>
          </DialogActions>
        </Dialog>
        )
  }

  render() {
    return (
      <>
        {this.editUser()}
        {this.messageBox()}
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
          <p id="error">{this.state.addError && this.state.addError}</p>
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

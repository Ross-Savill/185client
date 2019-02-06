import React, { Component } from 'react';
import '../Styles/App.css';
import { Redirect, Link } from "react-router-dom";
import decode from 'jwt-decode';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false,
      role: null,
      username: null
    }
  }

  componentDidMount = () => {
     const token = localStorage.getItem('token')
     const decodedToken = decode(token)
     const {username, role} = decodedToken
     this.setState({username, role})
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({loggedOut: true})
  }

  showUserLink = () => {
    if(this.state.role === 'admin'){
      return(
      <ul>
        <li>Users</li>
        <hr />
        <li><Link to="/dashboard/users">Manage Users</Link></li>
        <li><Link to="/dashboard/users/add">Add</Link></li>
      </ul>)
    }
  }

  render() {
    if(!this.state.loggedOut){
      return (
        <>
          <div id="sidebar">
            <div id="userbox">
            👋🏻 Welcome, {this.state.username && this.state.username}<br />
              <button onClick={this.logout}>Log out</button>
            </div>
            <div id ="navmenu">
              <ul>
                <li>Stock</li>
                <hr />
                <li><Link to="/dashboard/inventory">Manage Stock</Link></li>
              </ul>
              <ul>
                <li>Orders</li>
                <hr />
                <li><Link to="/dashboard/orders">Manage Orders</Link></li>
                <li><Link to="/dashboard/orders/add">Add</Link></li>
                <li><Link to="/dashboard/orders/edit">Edit</Link></li>
              </ul>
              {this.state.role === "admin" ? this.showUserLink() : ""}
            </div>
          </div>
        </>
      )
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default Sidebar;

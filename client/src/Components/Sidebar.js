import React, { Component } from 'react';
import '../Styles/App.css';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import decode from 'jwt-decode';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({loggedOut: true})
  }

  getUsername = () => {
     const token = localStorage.getItem('token')
     const decodedToken = decode(token)
     const {username} = decodedToken
     if(username){return username} else {return null}
  }

  render() {
    if(!this.state.loggedOut){
    return (
      <>
        <div id="sidebar">
          <div id="userbox">
          👋🏻 Welcome, {this.getUsername()}<br />
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
            <ul>
              <li>Users</li>
              <hr />
              <li><Link to="/dashboard/users">View All</Link></li>
              <li><Link to="/dashboard/users/add">Add</Link></li>
              <li><Link to="/dashboard/users/edit">Edit</Link></li>
              <li><Link to="/dashboard/users/delete">Delete</Link></li>
            </ul>
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

import React, { Component } from 'react';
import '../Styles/App.css';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

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

  render() {
    if(!this.state.loggedOut){
    return (
      <>
        <div id="sidebar">
          <div id="userbox">
          👋🏻 Welcome, Sam.<br />
            <button onClick={this.logout}>Log out</button>
          </div>
          <div id ="navmenu">
            <ul>
              <li>Stock</li>
              <hr />
              <li><Link to="/dashboard/inventory">Total Inventory</Link></li>
              <li><Link to="/dashboard/inventory/add">Add Inbound Stock</Link></li>
              <li><Link to="/dashboard/inventory/alerts">Alerts (3)</Link></li>
            </ul>
            <ul>
              <li>Products</li>
              <hr />
              <li><Link to="/dashboard/products">View All</Link></li>
              <li><Link to="/dashboard/products/add">Add</Link></li>
              <li><Link to="/dashboard/products/edit">Edit</Link></li>
              <li><Link to="/dashboard/products/delete">Delete</Link></li>
            </ul>
            <ul>
              <li>Orders</li>
              <hr />
              <li><Link to="/dashboard/orders">View All</Link></li>
              <li><Link to="/dashboard/orders/add">Add</Link></li>
              <li><Link to="/dashboard/orders/edit">Edit</Link></li>
              <li><Link to="/dashboard/orders/delete">Delete</Link></li>
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

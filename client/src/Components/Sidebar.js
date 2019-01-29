import React, { Component } from 'react';
import '../Styles/App.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  logout = () => {
    localStorage.removeItem('token')
  }

  render() {
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
              <li>Total Inventory</li>
              <li>Add Inbound Stock</li>
              <li>Alerts (3)</li>
            </ul>
            <ul>
              <li>Products</li>
              <hr />
              <li>View All</li>
              <li>Add</li>
              <li>Delete</li>
              <li>Edit</li>
            </ul>
            <ul>
              <li>Orders</li>
              <hr />
              <li>View All</li>
              <li>Add</li>
              <li>Delete</li>
              <li>Edit</li>
            </ul>
            <ul>
              <li>Users</li>
              <hr />
              <li>View All</li>
              <li>Add</li>
              <li>Delete</li>
              <li>Edit</li>
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Sidebar;
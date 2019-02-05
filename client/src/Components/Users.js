import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <div id="crud-container">
          <h1>Users</h1>
          <hr />
          <h3>Current Users</h3>
          <ul>
            <li></li>
          </ul>
        </div>
      </>
    )
  }
}

export default Users;
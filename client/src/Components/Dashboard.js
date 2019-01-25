import React, { Component } from 'react';
// import '../Styles/';
import axios from 'axios';
import Sidebar from './Sidebar'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Sidebar />
      </>
    )
  }
}

export default Dashboard;
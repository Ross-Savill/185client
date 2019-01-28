import React, { Component } from 'react';
import '../Styles/App.css';
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
        {/* Render whatever page you want to focus on here e.g. add new item page */}
      </>
    )
  }
}

export default Dashboard;
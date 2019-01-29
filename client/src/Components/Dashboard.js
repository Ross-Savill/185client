import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Sidebar from './Sidebar'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }

  isLoggedIn = () => {
    const token = localStorage.getItem('token')
    axios.post('https://vast-earth-81912.herokuapp.com/auth/status', null, {
      headers: {
        token
      }
    })
      .then(res => {
        if(res.data.success) {
          this.setState({ authenticated: true })
        } else {
        }
      })
  }

  render() {
    return (
      <>
        <Sidebar />
        {/* Render whatever page you want to focus on here e.g. add new item page */}
      </>
    )}
}

export default Dashboard;
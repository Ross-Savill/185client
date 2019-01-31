import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      ready: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if(token) {

    axios.post('https://vast-earth-81912.herokuapp.com/auth/status', null, {
      headers: {
        token
      }
    })
      .then(res => {
        if(res.data.success) {
          this.setState({ loggedIn: true, ready: true })
          console.log(this.state)
        } else {
        }
      })
    } else {
      this.setState({redirect:true})
    }
  }

  render() {
    if(!this.state.redirect){
      if(this.state.ready) {
        if(this.state.loggedIn){
          return (
            <>
              <Sidebar />
            </>
        )} else {
          this.setState({redirect:true})
        }
      } else {
        return ("loading")
      }
   } else {
     return <Redirect to="/login" />
   }
  }
}

export default Dashboard;

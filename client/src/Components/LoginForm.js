import React, { Component } from 'react';
import '../Styles/App.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    }
  }

  inputChange = (e) => {
    const { id, value } = e.currentTarget
    console.log(id, value)
    this.setState({ [id]:value })
  }
  
  login = (e) => {
    e.preventDefault()
    // axios.post the username and password to authentication path on our API
    axios.post('https://vast-earth-81912.herokuapp.com/auth/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      if(response.data.success === true) {
        const token = response.data.token;
        localStorage.setItem('token', token)
        this.setState({authenticated: true})
      } else {
        this.setState({error:response.data.message})
      }
    })
  }

  render() {
    const {authenticated} = this.state

    if(authenticated) {
      return <Redirect to="/dashboard" />
    }

    return (
      <>
        <div id="form-container">
          <div id="login-form">
            <h2>185 Warehouse Dashboard</h2>
            <p>Please enter your details below to log in</p>
            <hr />
            {this.state.error && <span className="error">{this.state.error}</span>}
            <form>
              <p>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={this.inputChange}></input><br />
              </p>
              <p>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={this.inputChange}></input><br />
              </p>
              <button id="login" onClick={this.login}>Log In</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm;

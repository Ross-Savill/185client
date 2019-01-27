import React, { Component } from 'react';
import '../Styles/Login.css';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
    console.log("Login Button Pressed")
    // axios.post the username and password to authentication path on our API
    axios.post('http://localhost:5000/auth/login', {
      username: this.state.email,
      password: this.state.password
    })
    .then(response => {
      if(response.data.success === true) {
        const token = response.data.token;
        console.log(token)
      } else {
        this.setState({error:response.data.message})
      }
    })
  }

  render() {
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
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" onChange={this.inputChange}></input><br />
              </p>
              <p>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={this.inputChange}></input><br />
              </p>
              <button id="login" onClick={this.login}>Log In</button>
            </form>
            {/* <p>
              <span>Email: {this.state.email}</span> <br/>
              <span>Password: {this.state.password}</span>
            </p> */}
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm;

import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordRepeat: "",
      passwordError: ""
    }
  }

  inputChange = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]:value }, () => { 
      const emailVerification = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

      if(!emailVerification.test(this.state.email)) {
        this.setState({emailError: "Please enter a valid email"})
      } else {
          this.setState({emailError: ""})
      }
      
      if (this.state.password !== this.state.passwordRepeat) {
        this.setState({passwordError: "Password doesn't match"})
      } else {
        this.setState({passwordError: ""})
      }
    })
  }

  register = (e) => {
    e.preventDefault()
    console.log("Register Button Pressed")
    // axios.post the username and password to registration path in API
  }


  render() {
    return (
      <>
        <div id="form-container">
          <div id="login-form">
            <h2>185 Warehousing Dashboard</h2>
            <p>Please enter your details below to register</p>
            <hr />
            <form>
              <p>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" onChange={this.inputChange}></input><br />
                {this.state.emailError && <span className="error">{this.state.emailError}</span>}
              </p>
              <p>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={this.inputChange}></input><br />
              </p>
              <p>
                <label htmlFor="passwordRepeat">Repeat Password: </label>
                <input type="password" id="passwordRepeat" onChange={this.inputChange}></input><br />
                {this.state.passwordError && <span className="error">{this.state.passwordError}</span>}
              </p>
              <button id="register" onClick={this.register}>Register</button>
            </form>
            {/* <p>
              <span>Password: {this.state.password}</span> <br/>
              <span>Password Repeat: {this.state.passwordRepeat}</span>
            </p> */}
          </div>
        </div>
      </>
    )
  }
}

export default RegisterForm;
import React, { Component } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import NavbarTop from './Components/NavbarTop';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
        </>
      </Router>
      
    );
  }
}

export default App;

import React, { Component } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import NewProduct from './Components/NewProduct';
import NavbarTop from './Components/NavbarTop';
import OrdersList from './Components/OrdersList'
import PickList from './Components/PickList'
<<<<<<< HEAD
=======
import Dashboard from './Components/Dashboard'
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/newproduct" component={NewProduct} />
          <Route path="/orders" exact component={OrdersList} />
          <Route path="/orders/:orderID/pick" exact component={PickList} />
<<<<<<< HEAD
=======
          <Route path="/dashboard" exact component={Dashboard} />
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6
        </>
      </Router>
    );
  }
}

export default App;

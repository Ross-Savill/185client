import React, { Component } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import NewProduct from './Components/NewProduct';
import OrdersList from './Components/OrdersList'
import PickList from './Components/PickList'
import Dashboard from './Components/Dashboard'

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/register" component={RegisterForm} />

          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/products/new" component={NewProduct} />

          <Route path="/newproduct" component={NewProduct} />
          <Route path="/orders" exact component={OrdersList} />
          
          <Route path="/orders/:orderID/pick" exact component={PickList} />
        </>
      </Router>
    );
  }
}

export default App;

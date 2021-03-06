import React, { Component } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import NewProduct from './Components/NewProduct';
import NewOrder from './Components/NewOrder';
import PickList from './Components/PickList'
import Dashboard from './Components/Dashboard'
import Inventory from './Components/Inventory'
import Users from './Components/Users'
import Orders from './Components/Orders'


class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/dashboard/inventory" component={Inventory} />
          <Route path="/dashboard/orders/add" component={NewOrder}/>
          <Route path="/dashboard/users" exact component={Users}/>
          <Route path="/dashboard/orders/" exact component={Orders}/>
          <Route path="/dashboard/orders/:orderID/pick" component={PickList} />
          <Route path="/dashboard/neworder" component={NewOrder} />
        </>
      </Router>
    );
  }
}

export default App;

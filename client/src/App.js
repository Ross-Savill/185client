import React, { Component } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import NewProduct from './Components/NewProduct';
import NewOrder from './Components/NewOrder';
import OrdersList from './Components/OrdersList'
import PickList from './Components/PickList'
import Dashboard from './Components/Dashboard'
import Inventory from './Components/Inventory'

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/register" component={RegisterForm} />

          <Route path="/dashboard" component={Dashboard} />

          <Route path="/dashboard/inventory" component={Inventory} />
          {/* <Route path="/dashboard/inventory/add" component= />
          <Route path="/dashboard/inventory/alerts" component= /> */}

          {/* <Route path="/dashboard/products" component= /> */}
          <Route path="/dashboard/products/add" component={NewProduct}/>
          {/* <Route path="/dashboard/products/delete" component= />
          <Route path="/dashboard/products/edit" component= /> */}

          {/* <Route path="/dashboard/orders" component= /> */}
          <Route path="/dashboard/orders/add" component={NewOrder}/>
          {/* <Route path="/dashboard/orders/delete" component= />
          <Route path="/dashboard/orders/edit" component= />

          <Route path="/dashboard/users" component= />
          <Route path="/dashboard/users/add" component= />
          <Route path="/dashboard/users/delete" component= />
          <Route path="/dashboard/users/edit" component= /> */}

          <Route path="/orders/:orderID/pick" exact component={PickList} />
          <Route path="/neworder" component={NewOrder} />
        </>
      </Router>
    );
  }
}

export default App;

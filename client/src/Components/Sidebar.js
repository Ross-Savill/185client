import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';
import QuickActions from './QuickActions';
import StockAlerts from './StockAlerts';
import QuickOrders from './QuickOrders';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <div id="sidebar">
          <QuickActions />
          <StockAlerts />
          <QuickOrders />
        </div>
      </>
    )
  }
}

export default Sidebar;
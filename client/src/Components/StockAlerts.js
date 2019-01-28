import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class StockAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <div id="stock-alerts">
        </div>
      </>
    )
  }
}

export default StockAlerts;
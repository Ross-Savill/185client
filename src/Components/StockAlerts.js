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
        Low: <br />
        Item 1 <br />
        Item 2 <br />
        Item 3 <br />
        See all >>
        </div>
      </>
    )
  }
}

export default StockAlerts;
import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class QuickOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <div id="quick-orders">
        Open: <br />
        Partial:<br />
        See all >>
        </div>
      </>
    )
  }
}

export default QuickOrders;
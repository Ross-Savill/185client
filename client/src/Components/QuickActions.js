import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class QuickActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <div id="quick-actions">
          <a href="#">Create Order</a>
          <a href="#">View/Edit Orders</a>
          <a href="#">Add New Stock</a>
          <a href="#">Delete Inventory Item</a>
          <a href="#">Stock Correction</a>
        </div>
      </>
    )
  }
}

export default QuickActions;
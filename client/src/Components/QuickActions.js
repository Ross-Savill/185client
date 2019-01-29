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
          <ul>
            <li><a href="#">Create Order</a></li>
            <li><a href="#">View/Edit Orders</a></li>
            <li><a href="#">Add New Stock</a></li>
            <li><a href="#">Delete Inventory Item</a></li>
            <li><a href="#">Stock Correction</a></li>
          </ul>
        </div>
      </>
    )
  }
}

export default QuickActions;
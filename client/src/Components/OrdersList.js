import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <>
        <div id="Order-list">
          <h2>Orders</h2>
          <h3>Open Orders</h3>
          <ul>
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">See All >></a></li>
          </ul>
          <h3>Partial Orders</h3>
          <ul>
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">See All >></a></li>
          </ul>
          <h3>Complete Orders</h3>
          <ul>
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">#OrderNumber</a></li>
            Company Name
            <li><a href="">See All >></a></li>
          </ul>
        </div>
      </>
    )
  }
}

export default OrdersList;

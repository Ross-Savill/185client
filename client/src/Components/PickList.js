import React, { Component } from 'react';
import '../Styles/Picklist.css';
import axios from 'axios';

class PickList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <>
        <div id="pick-list-container">
            <h2>Order: #OrderNumber</h2>
            <h3>Company: CHHL</h3>
            <div className="pick-list-item">
                  <h4>Product Description</h4>
                  <table>
                    <thead>
                      <tr>
                        <td>Requested</td>
                        <td>Scanned{/* Set the id of the form to the product ID then dynamically add the value of the form to a unique state.*/}</td>
                      </tr>
                    </thead>
                    <tr>
                      <td>5</td>
                      <td><input type="number" pattern="\d*"></input> <br /> </td>
                    </tr>
                  </table>
            </div>
            <div className="pick-list-item">
                  <h4>Product Description</h4>
                  <table>
                    <thead>
                      <tr>
                        <td>Requested</td>
                        <td>Scanned{/* Set the id of the form to the product ID then dynamically add the value of the form to a unique state.*/}</td>
                      </tr>
                    </thead>
                    <tr>
                      <td>5</td>
                      <td><input type="number" pattern="\d*"></input> <br /> </td>
                    </tr>
                  </table>
            </div>
            <div className="pick-list-item">
                  <h4>Product Description</h4>
                  <table>
                    <thead>
                      <tr>
                        <td>Requested</td>
                        <td>Scanned{/* Set the id of the form to the product ID then dynamically add the value of the form to a unique state.*/}</td>
                      </tr>
                    </thead>
                    <tr>
                      <td>5</td>
                      <td><input type="number" pattern="\d*"></input> <br /> </td>
                    </tr>
                  </table>
            </div>
            <div className="pick-list-item">
                  <h4>Product Description</h4>
                  <table>
                    <thead>
                      <tr>
                        <td>Requested</td>
                        <td>Scanned{/* Set the id of the form to the product ID then dynamically add the value of the form to a unique state.*/}</td>
                      </tr>
                    </thead>
                    <tr>
                      <td>5</td>
                      <td><input type="number" pattern="\d*"></input> <br /> </td>
                    </tr>
                  </table>
            </div>
          <button id="finish-pick">Finish Picking</button><br />
          <button><a href="/orders">Back</a></button>
        </div>
      </>
    )
  }
}

export default PickList;

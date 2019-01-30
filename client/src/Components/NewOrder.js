import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "",
      addProduct: "",
      colour: "",
      size: "",
      barcode:"",
      stockQuantity: ""
    }
  }

  addOrder = (e) => {
    e.preventDefault()
    console.log("Add Order Button Pressed")
  }

    render() {
      return (
        <div id="form-container">
            <div id="login-form">
            <h2>Add Order</h2>
            <p>Please enter the details of the new product below</p>
            <hr />
                <form>
                    <p>
                        <label htmlFor="orderId">Order ID: </label>
                        <input type="text" id="orderId" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="addProduct">Add Product: </label>
                        <input type="text" id="addProduct" onChange={this.inputChange}></input><br />
                    </p>
                    <button id="addOrder" onClick={this.addOrder}>Add Order</button>
                    </form>
                </div>
                </div>
            )
    }
}
export default NewOrder;

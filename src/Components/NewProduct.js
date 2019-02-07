import React, { Component } from 'react';
import '../Styles/App.css';
// import axios from 'axios';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      aeroCode: "",
      colour: "",
      size: "",
      barcode:"",
      stockQuantity: ""
    }
  }

  addProduct = (e) => {
    e.preventDefault()
    console.log("Add Product Button Pressed")
  }

    render() {
      return (
        <div id="crud-container">
            <h2>Add Product</h2>
            <p>Please enter the details of the new product below</p>
            <hr />
                <form>
                    <p>
                        <label htmlFor="productName">Product Name: </label><br />
                        <input type="text" id="productName" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="aeroCode">Aero Code: </label><br />
                        <input type="text" id="aeroCode" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="colour">Colour: </label><br />
                        <input type="text" id="colour" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="size">Size: </label><br />
                        <input type="text" id="size" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="barcode">Barcode Number: </label><br />
                        <input type="text" id="barcode" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="stockQuantity">Stock Quantity: </label><br />
                        <input type="number" id="stockQuantity" onChange={this.inputChange}></input><br />
                    </p>
                    <button id="addProduct" onClick={this.addProduct}>Add Product</button>
                    </form>
                </div>
            )
    }
}
export default NewProduct;

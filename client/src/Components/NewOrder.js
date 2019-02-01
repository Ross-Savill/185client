import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class NewOrder extends Component {
    state = {
        endpoint: "https://vast-earth-81912.herokuapp.com/inventory/product/all",
        matchArray: []
    }

    componentDidMount() {
        const allProducts = [];
        axios.get(this.state.endpoint)
        .then(blob => {
            const allProducts = blob.data.data
            this.setState({ allProducts })
        })
        .catch((err) => {
            console.log(err)
        })
    }

  findMatches = (wordToMatch, allProducts) => {
    return allProducts.filter(products => {
      const regex = new RegExp(wordToMatch, 'gi');
      return products.productName.match(regex) || products.productName.match(regex)
    });
  }

  displayMatches = (e) => {
    const value = e.currentTarget.value
        if (this.state.allProducts) {
            const { allProducts } = this.state
            const matchArray = this.findMatches(value, allProducts);
            console.log(matchArray)
            if(e.currentTarget.value == "") {
                this.setState ({ matchArray: [] })          
            } else {
                this.setState ({ matchArray })
            }
        }   
    }

//////////
  addOrder = (e) => {
    e.preventDefault()
    console.log("Add Order Button Pressed")
  }

  
    render() {
    // console.log(this.state)
    const suggestions = this.state.matchArray.map((suggestion, index) => {return(<li key={index}>Product: {suggestion.productName}, Aerocode: {suggestion.aeroCode}, Size: {suggestion.size}, Colour: {suggestion.color}, Barcode: {suggestion.barcode}, Stock Count: {suggestion.stockCount}</li>)})
    console.log(suggestions)
    return (

            <div id="crud-container">
            <h2>Add Order</h2>
            <p>Please enter the details of the new order below</p>
            <hr />
                <form>
                    <p>
                        <label htmlFor="orderId">Order ID: </label>
                        <input type="text" id="orderId" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="addProduct">Add Product: </label>
                        <input type="text" id="addProduct" onChange={this.displayMatches}></input><br />
                    </p>
                    <button id="addOrder" onClick={this.addOrder}>Add Order</button>
                </form>
                <div className="suggestions">
                    <ul>{suggestions}</ul>
                </div>
            </div>
        )
    }
}
export default NewOrder;

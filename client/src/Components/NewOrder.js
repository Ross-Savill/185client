import React, { Component, createRef } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class NewOrder extends Component {

    state = {
        endpoint: "https://vast-earth-81912.herokuapp.com/inventory/product/all",
        matchArray: [],
        orderList:[],
        alreadyInOrder: []
    }

    orderIdRef = createRef()

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
      return products.productName.match(regex)
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

    addProduct = (e) => {
        const productString = e.currentTarget.innerHTML // WHOLE STRING
        const partsArray = productString.split(",")     // ALL 6 BITS IN ARRAY
        const aerocode = partsArray.splice(1, 1)        // PULL OUT THE AEROCODE INTO ITS OWN ARRAY
        const stringAerocode = aerocode.toString()      // TURN AEROCODE TO STRING
        const aerocodeArray = stringAerocode.split(": ") // SPLIT AEROCODE INTO "AEROCODE" AND CODE
        const theCodeArray = aerocodeArray.splice(1, 1) // JUST THE CODE IN AN ARRAY
        const theCode = theCodeArray.toString()         // FINALLY THE CODE I NEED
        const objectToAdd = this.state.matchArray.find(product => product.aeroCode == theCode)
        this.setState({orderList:[...this.state.orderList, objectToAdd]}, () => {
            console.log(this.state.orderList)
            console.log(this.state.alreadyInOrder)
        })
        this.setState({alreadyInOrder:[...this.state.alreadyInOrder, theCode]})
        let elem = document.querySelector('#addProductTextField')
        elem.value = ""
        this.setState ({ matchArray: [] })  
    }

    addOrder = (e) => {
        e.preventDefault()
        // to send the below
        // axios.post(req, res)
        //     res.send(
        //     products: this.state.orderList
        //     orderID: this.orderIdRef.current.value
        //     )
    }

    render() {
    const suggestions = this.state.matchArray.filter((suggestion) => {
        return !this.state.alreadyInOrder.includes(suggestion.aeroCode)
    })

    const result = suggestions.map((suggestion, index) => {
        return(
            <li key={index} onClick={this.addProduct} className="suggested-list-item">
            Product: {suggestion.productName}, 
            Aerocode: {suggestion.aeroCode}, 
            Size: {suggestion.size}, 
            Colour: {suggestion.color}, 
            Barcode: {suggestion.barcode}, 
            Stock Count: {suggestion.stockCount}
        </li>)})

    const orderContents = this.state.orderList.map((product, index) => {
        return(
            <p key={index}>
        Product: {product.productName}, Aerocode: {product.aeroCode}, Size: {product.size}, 
        Colour: {product.color}, Barcode: {product.barcode}, Stock Count: {product.stockCount}
            </p>
        )
    })

        return (
            <div id="crud-container">
            <h2>Add Order</h2>
            <p>Please enter the details of the new order below</p>
            <hr />
                <form onSubmit={this.addOrder}>
                    <p>
                        <label htmlFor="orderId">Order ID: </label>
                        <input type="text" ref={this.orderIdRef} id="orderId" onChange={this.inputChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="addProduct">Add Product: </label>
                        <input type="text" id="addProductTextField" onChange={this.displayMatches}></input><br />
                    </p>
                    <div className="suggestions">
                        <ul> {result} </ul>
                    </div>
                    <div className="orderContents">
                        <h2> Current Order Contents</h2>
                        <ul>{orderContents}</ul>
                    </div>
                    <button id="submit">Add Order</button>
                </form>
            </div>
        )
    }
}
export default NewOrder;

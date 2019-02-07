import React, { Component, createRef } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class NewOrder extends Component {

    state = {
        endpoint: "https://vast-earth-81912.herokuapp.com/inventory/product/all",
        matchArray: [],
        orderId: null,
        orderList:[],
        alreadyInOrder: []
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

  inputOrderIdChange = (e) => {
        const orderId = e.currentTarget.value
        this.setState({ orderId })
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
            // console.log(matchArray)
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
        this.setState({orderList:[...this.state.orderList, objectToAdd]})
        this.setState({alreadyInOrder:[...this.state.alreadyInOrder, theCode]})
        let elem = document.querySelector('#addProductTextField')
        elem.value = ""
        this.setState ({ matchArray: [] })  
    }

    handleQuantityChange(value, barcode) {
        const objToAddQtyTo = this.state.orderList.find(product => product.barcode == barcode)
        objToAddQtyTo.quantity = value
        // console.log(this.state.orderList)
    }

    handleCopy(barcode) {
        // const orderListCopy = [...this.state.orderList]
        const {orderList} = this.state
        const objToDelete = orderList.find(product => product.barcode === barcode)
        const index = orderList.indexOf(objToDelete)
        orderList.splice(index, 1)
        return orderList
    }

    handleDeleteProduct(barcode) {
        const result = this.handleCopy(barcode)
        this.setState({orderList: result}, () => {
            console.log('done')
        })
    }

    addOrder = (e) => {
        e.preventDefault()
        const { orderId, orderList } = this.state
        let errors = 0;
        for (let i=0; i < orderList.length; i++) {
            if (orderList[i].quantity <= 0 || typeof orderList[i].quantity == 'null' || typeof orderList[i].quantity == 'undefined') {
                errors++
            }
        }
        if (errors > 0) {
            return alert("Please check product quantities")
        } else {
            axios.post('https://vast-earth-81912.herokuapp.com/orders', {
                orderID: orderId,
                productsList: orderList
            })
            .then(response => {
                console.log(response)
            })
        }
    }

    render() {
    console.log(this.state.orderList)
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
        <div key={product.barcode}>
            <table>
                <thead>
                    <tr>
                        <td><strong><em>Item #{index + 1}</em></strong></td>
                    </tr>
                </thead>
                    <tbody>
                            <tr><strong>Product:</strong> {product.productName}</tr> 
                            <tr><strong>Aerocode:</strong> {product.aeroCode}</tr> 
                            <tr><strong>Size:</strong> {product.size}</tr>
                            <tr><strong>Colour:</strong> {product.color}</tr>
                            <tr><strong>Barcode:</strong> {product.barcode}</tr>
                            <tr><strong>Stock Count:</strong> {product.stockCount}</tr>
                            <label> Quantity: </label>
                            {/* <Quantity value={product.quantity} product={product} onChange={(e) => this.handleQuantityChange(e.target.value, product.barcode)} /> */}
                            <tr><input type="number" pattern="\d*" onChange={(e) => this.handleQuantityChange(e.target.value, product.barcode)}></input></tr>
                            <td><button onClick={() => this.handleDeleteProduct(product.barcode)}>Delete</button></td>
                            <hr/>
                            <br/>
                    </tbody>
            </table>
        </div>
        )
    })

        return (
            <div id="crud-container">
            <h2>Add Order</h2>
            <p>Please enter the details of the new order below</p>
            <hr />
                <form onSubmit={this.addOrder}>
                    <p>
                        <label htmlFor="orderId">Order ID: </label><br />
                        <input type="text" id="orderId" onChange={this.inputOrderIdChange}></input><br />
                    </p>
                    <p>
                        <label htmlFor="addProduct">Add Product: </label><br />
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

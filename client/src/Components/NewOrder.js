import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class NewOrder extends Component {
    state = {
        endpoint: "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json",
        matchArray: []
    }

    componentDidMount() {
        const cities = [];
        axios.get(this.state.endpoint)
        .then(blob => {
            const cities = blob.data
            this.setState({ cities }) 
        })
        .catch((err) => {
            console.log(err)
        })
    }

  findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    });
  }

  displayMatches = (e) => {
    const value = e.currentTarget.value
        if (this.state.cities) {
            const { cities } = this.state
            const matchArray = this.findMatches(value, cities);
            console.log(matchArray)
            if(e.currentTarget.value == "") {
                this.setState ({ matchArray: [] })          
            } else {
                this.setState ({ matchArray })
            }
            
        
            // return matchArray.map(place => {
            //     const cityName = place.city
            //     const stateName = place.state
            // console.log(cityName, stateName)
            // })
        }   
    }

//////////
  addOrder = (e) => {
    e.preventDefault()
    console.log("Add Order Button Pressed")
  }

  
    render() {
    console.log(this.state)
    const suggestions = this.state.matchArray.map((suggestion, index) => {return(<li key={index}>{suggestion.city}</li>)})
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

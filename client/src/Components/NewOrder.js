import React, { Component } from 'react';
import '../Styles/App.css';
import axios from 'axios';

class NewOrder extends Component {
    state = {
        endpoint: "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
    }
//   constructor(props) {
//     super(props);
//     this.state = {
//       orderId: "",
//       addProduct: "",
//       matchArray: null
//     }
// /////////////

// const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"

// getCityData = () => {
//     const cities = [];
//     axios.get(this.state.endpoint)
//     .then(blob => blob.json())
//     .then(data => {
//         console.log(data)
//         cities.push(...data)
//     })
// }

    componentDidMount() {
        const cities = [];
        console.log('hi')
        axios.get(this.state.endpoint)
        .then(blob => {
            // blob.json())
            // console.log(blob)
            const cities = blob.data
            this.setState({ cities }) 
        })
        // .then(data => {
        //     this.setState({ data })
        //     // cities.push(...data)
        // })
        .catch((err) => {
            console.log('here')
        })
    }

  findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    });
  }

  displayMatches = (e) => {
    const value = e.currentTarget.value
    // const cities = this.getCityData()
    if (this.state.cities) {
        const { cities } = this.state
        const matchArray = this.findMatches(value, cities);
        console.log(matchArray)
    }
    // const matchArray = this.findMatches(value, cities);
    // console.log(matchArray)
    // const html = matchArray.map(place => {
    //   const regex = new RegExp(this.value, 'gi');
    //   const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    //   const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    //   return `
    //     <li>
    //       <span class="name">${cityName}, ${stateName}</span>
    //       <span class="population">${(place.population)}</span>
    //     </li>
    //   `;
    // }).join('');
    // suggestions.innerHTML = html;
    }

//////////
  addOrder = (e) => {
    e.preventDefault()
    console.log("Add Order Button Pressed")
  }

  
    render() {
    console.log(this.state)
      return (
        <div id="form-container">
            <div id="login-form">
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
                </div>
                </div>
            )
    }
}
export default NewOrder;

import React, { Component } from 'react';
import '../Styles/Picklist.css';
import axios from 'axios';
import io from 'socket.io-client';
import { Link } from "react-router-dom";

class PickList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderID: "",
      orderStatus: "",
      orderProducts: [],
      online: false,
      error: false,
      errorMessage: ""
    }
  }

  connectToBarcode = () => {
    const self = this;
    console.log("[!] Connecting . . . ");
    const socket = io('https://vast-earth-81912.herokuapp.com');
    socket.on('connect', function () {
    	self.setState({online: true})
    });
    socket.on('disconnect', function () {
      self.setState({online: false})
    });

    socket.on('error', function(errorMessage) {
      console.log('error')
      self.setState({error: true, errorMessage})
    })

    socket.on('triggerUpdate', function () {
      self.retrieveData()
    });

  }

  retrieveData = () => {
    const { params } = this.props.match;
    const orderID = params.orderID;
    axios.get(`https://vast-earth-81912.herokuapp.com/orders/${orderID}`)
    .then(resp => {
      if (resp.data.success) {
        this.setState({
          success: true,
          orderID,
          orderStatus:resp.data.data.status,
          orderProducts:resp.data.data.products,
          orderCreated:resp.data.data.createdAt,
          orderCompleted:resp.data.data.completedAt
        })
      } else {
        this.setState({
          success: false,
          orderID: "Not Found",
          orderStatus: "Not found",
          orderProducts: []
        })
      }
    })
  }

  componentDidMount() {
    this.connectToBarcode()
    this.retrieveData()
    const { params } = this.props.match;
    const orderID = +params.orderID;
    axios.post('https://vast-earth-81912.herokuapp.com/orders/currentOrder', {
      orderID
    })
    .then(resposne => {
      console.log(resposne)
    })
  }

  listOrders = () => {
    const { orderProducts } = this.state
    return orderProducts.map((order) => {
      return <div className="pick-list-item">
          <h4>{order.productName}</h4>
          <table>
            <thead>
              <tr>
                <td>Quantity</td>
                <td>Scanned{/* Set the id of the form to the product ID then dynamically add the value of the form to a unique state.*/}</td>
                <td>Filled?</td>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>{order.pickCount}/{order.quantity}</td>
              <td><input type="number" pattern="\d*"></input> <br /> </td>
              <td> {this.isFilled(order.quantity,order.pickCount)} </td>
            </tr>
            </tbody>
          </table>
      </div>
    })
  }
  checkOnline(online) {
    if(online) {
      const style = {color: "green"}
      return <i className="fas fa-wifi" style={style}></i>
    } else {
      const style = {color: "red"}
      return <i className="fas fa-wifi" style={style}></i>
    }
  }

    checkOrderStatus = (status) => {
      if(status == "partial") {
        return <span className="badge badge-warning">Partial</span>
      } else if(status == "complete") {
        return <span className="badge badge-success">Complete</span>
      } else if(status == "new") {
        return <span className="badge badge-primary">New</span>
      } else if(status == "Not found") {
        return <span className="badge badge-danger">Not found</span>
      } else {
        return
      }
    }

    isFilled = (qty, filled) => {
      if(filled == qty) {
        const style={color:"#28a745"}
        return <i className="fas fa-check" style={style}></i>
      } else {
        const style={color:"#dc3545"}
        return <i className="fas fa-times" style={style}></i>
      }
    }

    checkErrors = () => {
      const style={color:"#dc3545"}
      console.log(this.state.error)
      if(this.state.error) {
        return <div style={style}>Wrong barcode</div>
      } else {
        return <div style={style}></div>
      }
    }

  render() {
    const barcodeError = this.checkErrors();
    const orders = this.listOrders();
    const online = this.checkOnline(this.state.online);
    const orderStatus = this.checkOrderStatus(this.state.orderStatus);
    return (
      <>
        <div id="pick-list-container">
            Status: {online}
            <br/><br/>
            {barcodeError}
            <br/><br/>
            <h2>Order: {this.state.orderID}</h2>
            <h3>Status: {orderStatus}</h3>

            {orders}

            <br/><br/><br/>
            <Link to="/dashboard/orders">Back to Orders</Link>

        </div>
      </>
    )
  }
}

export default PickList;

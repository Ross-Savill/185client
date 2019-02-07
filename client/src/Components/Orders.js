import React, { Component } from 'react';
import {ReactDOM} from "react-dom";
import {Redirect, Link} from "react-router-dom"
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import Timestamp from 'react-timestamp';
import NewOrder from './NewOrder';

class Orders extends Component {

  state = {
    ready: false,
    openOrders: [],
    closedOrders: [],
    cancelledOrders: [],
    openOrder: false,
    orderID: "",
    orderStatus: "",
    orderProducts: [],
    orderCreated: null,
    orderCompleted: null,
    orderCost:10,
    pickCost:0.50,
    redirect: false,
    showAlert: false,
    alertMessageText: "",
    redirectCreate: false
  }

  redirect = () => {
    if(this.state.redirect) {
      const {orderID} = this.state
      const url = `/dashboard/orders/${orderID}/pick`
      return <Redirect to={url}/>
    }
  }

  formatStatus = (status) => {
    if (status == "new") {
      return <span className="badge badge-primary">New</span>
    } else if (status == "partial") {
      return <span className="badge badge-warning">Partial</span>
    } else if (status == "complete") {
      return  <span className="badge badge-success">Complete</span>
    } else if (status == "cancel") {
      return <span className="badge badge-danger">Canceled</span>
    }
  }

  formatTime = (timestamp) => {
    if(timestamp == null) {
      return <i className="fas fa-minus"></i>
    } else {
      return <Timestamp time={timestamp/1000} format='full' />
    }

  }

  getDatabase = () => {
    axios.get('https://vast-earth-81912.herokuapp.com/orders/')
      .then(result => {
        if(result.data.success) {
          let openOrders = []
          let closedOrders = []
          let cancelledOrders = []
          for(let i=0; i<result.data.data.length; i++) {
            if (result.data.data[i].status == "new") {
              result.data.data[i].status = this.formatStatus('new')
              result.data.data[i].completedAt =  this.formatTime(null)
              result.data.data[i].createdAt = this.formatTime(result.data.data[i].createdAt)
              openOrders.push(result.data.data[i])
            } else if (result.data.data[i].status == "partial") {
              result.data.data[i].status = this.formatStatus('partial')
              result.data.data[i].completedAt =  this.formatTime(null)
              result.data.data[i].createdAt = this.formatTime(result.data.data[i].createdAt)
              openOrders.push(result.data.data[i])
            } else if (result.data.data[i].status == "complete") {
              result.data.data[i].status = this.formatStatus('complete')
              result.data.data[i].completedAt = this.formatTime(result.data.data[i].completedAt)
              result.data.data[i].createdAt = this.formatTime(result.data.data[i].createdAt)
              closedOrders.push(result.data.data[i])
            } else if (result.data.data[i].status == "cancel") {
              result.data.data[i].status = this.formatStatus('cancel')
              result.data.data[i].completedAt = this.formatTime(result.data.data[i].completedAt)
              result.data.data[i].createdAt = this.formatTime(result.data.data[i].createdAt)
              cancelledOrders.push(result.data.data[i])
            }
          }
          this.setState({ready:true, openOrders, closedOrders, cancelledOrders})
        } else {
          // error
        }
      })
  }

  componentDidMount() {
    this.getDatabase();
  }

  pickList = (orderID) => {
    this.setState({orderID, redirect:true})
  }



  openOrderTable = () => {
    const columns = ["Order ID", "Products", "Status", "Created", "Completed", "", ""];
    const data = []
    const { openOrders } = this.state
    openOrders.map((item) => {
      let temp = [
            '#'+item.orderID,
            item.products.length,
            item.status,
            item.createdAt,
            item.completedAt,
            <i color="primary" onClick={() => this.pickList(item.orderID)} className="fas fa-barcode"></i>,
            <i onClick={() => this.openOrder(item.orderID)} className="fas fa-eye"></i>
            //<> <i onClick={() => this.editModal(item)} className="fas fa-pencil-alt"></i> <i onClick={() => this.deleteModal(item)} className="fas fa-trash"></i></>
          ]
      data.push(temp)
    })
    const options = {
      filterType: "dropdown",
    };
    const style = {
      padding: "4px",
      margin: "3px"
    }
return (
  <MUIDataTable
    title={<span>Open Orders <Badge style={style} className="ordersTable" color="primary" badgeContent={this.state.openOrders.length}></Badge></span>}
    data={data}
    columns={columns}
    options={options}
  />
);

}

closedOrderTable = () => {
  const columns = ["Order ID", "Products", "Status", "Created", "Completed", "", ""];
  const data = []
  const { closedOrders } = this.state
  closedOrders.map((item) => {

    let temp = [
          '#'+item.orderID,
          item.products.length,
          item.status,
          item.createdAt,
          item.completedAt,
          "",
          <i onClick={() => this.openOrder(item.orderID)} className="fas fa-eye"></i>,
          //<> <i onClick={() => this.editModal(item)} className="fas fa-pencil-alt"></i> <i onClick={() => this.deleteModal(item)} className="fas fa-trash"></i></>
        ]
    data.push(temp)
  })
  const options = {
    filterType: "dropdown",
  };

return (
<MUIDataTable
  title={<span>Closed Orders</span>}
  data={data}
  columns={columns}
  options={options}
/>
);

}

cancelledOrderTable = () => {

  const columns = ["Order ID", "Products", "Status", "Created", "Canceled", "", ""];
  const data = []
  const { cancelledOrders } = this.state
  cancelledOrders.map((item) => {

    let temp = [
          '#'+item.orderID,
          item.products.length,
          item.status,
          item.createdAt,
          item.completedAt,
          "",
          <i onClick={() => this.openOrder(item.orderID)} className="fas fa-eye"></i>,
          //<> <i onClick={() => this.editModal(item)} className="fas fa-pencil-alt"></i> <i onClick={() => this.deleteModal(item)} className="fas fa-trash"></i></>
        ]
    data.push(temp)
  })
  const options = {
    filterType: "dropdown",
  };
  const style = {
    padding: "4px",
    margin: "3px",
  }
return (
<MUIDataTable
  title={<span>Canceled Orders</span>}
  data={data}
  columns={columns}
  options={options}
/>
);

}

  openOrder = (orderID) => {
    axios.get(`https://vast-earth-81912.herokuapp.com/orders/${orderID}`)
      .then(response => {
        if (response.data.success) {
          this.setState({
            openOrder:true,
            success: true,
            orderID,
            orderStatus:response.data.data.status,
            orderProducts:response.data.data.products,
            orderCreated:response.data.data.createdAt,
            orderCompleted:response.data.data.completedAt
          })

        }
      })
  }

  closeOrder = () => {
    this.setState({openOrder:false})
  }

  listOrders = () => {
    const { orderProducts } = this.state
    return orderProducts.map((order) => {
      return  <tr>
              <td>{order.productName}</td>
              <td>{order.pickCount}</td>
              <td>{order.quantity}</td>
              <td> {this.isFilled(order.quantity,order.pickCount)} </td>
            </tr>


    })
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

  cancelOrder = () => {
    const {orderID} = this.state;
    axios.put('https://vast-earth-81912.herokuapp.com/orders/status', {
      orderID,
      status: "cancel"
    })
    .then(response => {
      console.log(response)
      if(response.data.success) {
        this.getDatabase();
        this.setState({showAlert:true, alertMessageText:response.data.message, openOrder:false})
      } else {
        this.setState({showAlert:true, alertMessageText:`Error: ${response.data.message}`, openOrder:false})
      }
    })
  }

  restoreOrder = () => {
    const {orderID} = this.state;
    axios.put('https://vast-earth-81912.herokuapp.com/orders/status', {
      orderID,
      status: "new"
    })
    .then(response => {
      console.log(response)
      if(response.data.success) {
        this.getDatabase();
        this.setState({showAlert:true, alertMessageText:response.data.message, openOrder:false})
      } else {
        this.setState({showAlert:true, alertMessageText:`Error: ${response.data.message}`, openOrder:false})
      }
    })
  }

  messageBoxClose= () => {
    this.setState({showAlert:false})
  }

  messageBox = () => {
    return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right',}}
      open={this.state.showAlert}
      autoHideDuration={5000}
      onClose={this.messageBoxClose}
      message={<span id="message-id">{this.state.alertMessageText}</span>}
      />
  )
  }

  messageBoxOpen = () => {
    this.setState({alertMessage:true})
  }

  showOrderOptions = (status) => {
    if(status == 'partial' || status == 'new' ) {
      return <button onClick={this.cancelOrder} className="btn btn-outline-danger btn-sm">Cancel Order</button>
    } else if (status == "cancel") {
      return <button onClick={this.restoreOrder} className="btn btn-outline-primary btn-sm">Restore Order</button>
    } else {
      return
    }
  }

  orderModal = (item) => {
    const {orderProducts } = this.state;
    return (
    <Dialog open={this.state.openOrder} onClose={this.closeOrder} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">View Order #{this.state.orderID}</DialogTitle>
          <DialogContent>
          {this.formatStatus(this.state.orderStatus)}
          <br/><br/>
          Created: {this.formatTime(this.state.orderCreated)}
          <br/>
          Completed: {this.formatTime(this.state.orderCreated)}
          <br/><br/>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Picked</th>
                <th scope="col">Filled?</th>
              </tr>
            </thead>
            <tbody>
              {this.listOrders()}
          </tbody>
          </table>
          Pick Profit: ${this.calculatePickProfit()}
          </DialogContent>
          <DialogActions>
          {this.showOrderOptions(this.state.orderStatus)}

            <button className="btn btn-outline-primary btn-sm" onClick={this.closeOrder} autoFocus>
              Close
            </button>
          </DialogActions>
        </Dialog>
        )
  }

  calculatePickProfit = () => {
    let profit = 0;
    profit+= this.state.orderCost
    for(let i=0; i<this.state.orderProducts.length; i++) {
      profit+=(this.state.orderProducts[i].quantity * this.state.pickCost)
    }
    return profit;
  }

  redirectToCreate = () => {
    this.setState({redirectCreate: true})
  }

  redirectCreate = () => {
    if (this.state.redirectCreate) {
      return <Redirect to="/dashboard/neworders"/>
    }
  }

  render() {
    return (
      <>
        <div id="crud-container">
        <Button variant="contained" color="primary" onClick={this.redirectToCreate}>Create Order</Button>
          {this.redirectCreate()}
          {this.messageBox()}
          {this.redirect()}
          {this.openOrderTable()}
          <br/><br/>
          {this.closedOrderTable()}
          <br/><br/>
          {this.cancelledOrderTable()}
          {this.orderModal()}
        </div>
      </>
    );
  }
}

export default Orders;

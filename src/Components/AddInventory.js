import React, { Component } from 'react';
import ReactDOM from "react-dom";
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

class AddInventory extends Component {

  state = {
    openAlert: false,
    alertMessageText: "",
    openAdd: false,
    add: {}
  }

  addModal = (item) => {
    const {add} = this.state
    return (
      <Dialog open={this.state.openAdd} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {"Barcode and Aerocode's must be unique"}
          </DialogContentText>
          <TextField autoFocus margin="dense" onChange={this.inputChange} id="productName" label="Product Name" type="text" fullWidth defaultValue={add.productName}/>
          <TextField margin="dense" onChange={this.inputChange} id="size" label="Size" type="text" fullWidth defaultValue={add.size}/>
          <TextField margin="dense" onChange={this.inputChange} id="color" label="Color" type="text" fullWidth defaultValue={add.color}/>
          <TextField margin="dense" onChange={this.inputChange} id="stockCount" label="Stock Count" type="number" fullWidth defaultValue={add.stockCount}/>
          <TextField margin="dense" onChange={this.inputChange} id="aeroCode" label="Aerocode" type="text" fullWidth defaultValue={add.aeroCode}/>
          <TextField margin="dense" onChange={this.inputChange} id="barcode" label="Barcode" type="number" fullWidth defaultValue={add.barcode}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submitSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  submitSave = () => {
    axios.post('https://vast-earth-81912.herokuapp.com/inventory/product', this.state.add)
      .then(res => {
        let message = res.data.message;
        if(res.data.success) {
          this.setState({alertMessageText: message, openAlert:true, openAdd: false})
        } else {
          message = 'ERROR: ' + message
          this.setState({alertMessageText: message, openAlert: true})
        }
      })
  }

  handleClose = () => {
    this.setState({openAdd:false})
  }

  inputChange = (e) => {
    const { id, value } = e.currentTarget
    const add = this.state.add
    add[id] = value;
    this.setState({add})
  }

  addInventory = () => {
    this.setState({openAdd:true})
  }

  messageBox = () => {
    return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right',}}
      open={this.state.openAlert}
      autoHideDuration={5000}
      onClose={this.messageBoxClose}
      message={<span id="message-id">{this.state.alertMessageText}</span>}
      // action={[
      //    <Button key="undo" color="secondary" size="small" onClick={this.undoDelete}>
      //      UNDO
      //    </Button>,
      //  ]}
      />
    )
  }

  messageBoxClose= () => {
    this.setState({openAlert:false})
  }

  messageBoxOpen = () => {
    this.setState({openAlert:true})
  }

  render() {
    return (
      <>
        <Button variant="contained" color="primary" onClick={this.addInventory}>Add Product</Button>
        {this.addModal()}
        {this.messageBox()}
      </>
    );
  }
}

export default AddInventory;
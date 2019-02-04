import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
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
import AddInventory from './AddInventory'
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage:false,
      alertMessageText: "this is a test",
      alertMessageType: "",
      openEdit: false,
      openDelete: false,
      ready: true,
      add: {
      },
      remove: {
        productName: "",
        size: "",
        color: "",
        barcode: "",
        aeroCode: ""
      },
      cancelEdit: {},
      edit: {
        productName: "",
        size: "",
        color: "",
        barcode: "",
        aeroCode: ""
      },
      inventory: []
    }
  }

  componentDidMount() {
    axios.get('https://vast-earth-81912.herokuapp.com/inventory/product/all')
      .then(result => {
        if(result.data.success) {
          this.setState({ready: true, inventory:result.data.data})
          this.datatablePage();
        } else {
          // error
        }
      })
  }

   handleClose = () => {
     this.setState({ openEdit: false, openDelete: false });
   };

  editModal = (item) => {
    this.setState({edit:item, openEdit:true})
  }

  deleteModal= (item) => {
    this.setState({remove:item, openDelete:true})
  }

  acceptDelete = () => {
    if(this.state.remove.barcode)
    axios.delete('https://vast-earth-81912.herokuapp.com/inventory/product', {
      data: {
        barcode:this.state.remove.barcode
      }
    })
    .then(response => {
      if(response.data.success) {
        this.setState({alertMessage:true , alertMessageText: `${this.state.remove.productName} has been deleted!`, alertMessageType: "", openDelete: false})
      } else {
        this.setState({alertMessage:true , alertMessageText: `ERROR: ${response.data.message}`, alertMessageType: "", openDelete: false})
      }
    })
  }

  acceptEdit = () => {
    const {edit} = this.state;
    axios.put('https://vast-earth-81912.herokuapp.com/inventory/product', edit)
    .then(response => {
      if(response.data.success) {
        this.setState({alertMessage:true , alertMessageText: `${edit.productName} has been edited!`, alertMessageType: "", openEdit: false})
      } else {
        this.setState({alertMessage:true , alertMessageText: `ERROR: ${response.data.message}`, alertMessageType: "", openEdit: false})
      }
    })
  }

  datatablePage = () => {
    const columns = ["Product Name", "Size", "Color", "Stock Count", "Barcode", "Aerocode", ""];
    const data = []
    const { inventory } = this.state
    inventory.map((item) => {
      let temp = [
            item.productName,
            item.size,
            item.color,
            item.stockCount,
            item.barcode,
            item.aeroCode,
            <> <i onClick={() => this.editModal(item)} className="fas fa-pencil-alt"></i> <i onClick={() => this.deleteModal(item)} className="fas fa-trash"></i></>
          ]
      data.push(temp)
    })
    const options = {
      filterType: "dropdown",
  //   responsive: "scroll"
};


    return (
      <MUIDataTable
        title={"Inventory List"}
        data={data}
        columns={columns}
        options={options}
      />
  );
  }

  openDeleteModal = (item) => {
    const {remove} = this.state;
    return (
    <Dialog open={this.state.openDelete} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete <strong>{this.state.remove.productName}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary"  onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={this.acceptDelete} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        )
  }

  openEditModal = (item) => {
    const {edit} = this.state
    return (
      <Dialog open={this.state.openEdit} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {"Barcode and Aerocode's must be unique"}
          </DialogContentText>
          <TextField autoFocus margin="dense" onChange={this.inputChange} id="productName" label="Product Name" type="text" fullWidth defaultValue={edit.productName}/>
          <TextField margin="dense" onChange={this.inputChange} id="size" label="Size" type="text" fullWidth defaultValue={edit.size}/>
          <TextField margin="dense" onChange={this.inputChange} id="color" label="Color" type="text" fullWidth defaultValue={edit.color}/>
          <TextField margin="dense" onChange={this.inputChange} id="stockCount" label="Stock Count" type="number" fullWidth defaultValue={edit.stockCount}/>
          <TextField margin="dense" onChange={this.inputChange} id="aeroCode" label="Aerocode" type="text" fullWidth defaultValue={edit.aeroCode}/>
          <TextField margin="dense" onChange={this.inputChange} id="barcode" label="Barcode" type="number" fullWidth defaultValue={edit.barcode} disabled/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.acceptEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  messageBoxClose= () => {
    this.setState({alertMessage:false})
  }

  messageBoxOpen = () => {
    this.setState({alertMessage:true})
  }

  undoDelete = () => {
    axios.post('https://vast-earth-81912.herokuapp.com/inventory/product', this.state.remove)
    .then(response => {
      if(response.data.success) {
        this.setState({alertMessage:true , alertMessageText: `${this.state.remove.productName} has been restored!`, alertMessageType: "", openEdit: false})
      } else {
        this.setState({alertMessage:true , alertMessageText: `ERROR: ${response.data.message}`, alertMessageType: "", openEdit: false})
      }
    })
  }

  messageBox = () => {
    return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right',}}
      open={this.state.alertMessage}
      autoHideDuration={5000}
      onClose={this.messageBoxClose}
      message={<span id="message-id">{this.state.alertMessageText}</span>}
      action={[
         <Button key="undo" color="secondary" size="small" onClick={this.undoDelete}>
           UNDO
         </Button>,
       ]}
      />
  )
  }

  inputChange = (e) => {
    const { id, value } = e.currentTarget
    const edit = this.state.edit
    edit[id] = value;
    this.setState({edit})
  }



  render() {
    return (
      <div className="container">
      <AddInventory/>
      {this.messageBox()}
      {this.openEditModal()}
      {this.openDeleteModal()}
      {this.datatablePage()}
      </div>

    )}
}

export default Inventory;
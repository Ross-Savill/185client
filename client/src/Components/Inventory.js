import React, { Component } from 'react';
import ReactDOM from "react-dom";

import '../Styles/App.css';
import axios from 'axios';
import MUIDataTable from "mui-datatables";


class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
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
          ]
      data.push(temp)
    })
    const options = {
      filterType: "dropdown",
     responsive: "scroll"
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

  render() {
    const tableStyle = {width:"100%"}
    return (

      <div id="crud-container" className="container">
      {this.datatablePage()}
      </div>
    )}
}

export default Inventory;

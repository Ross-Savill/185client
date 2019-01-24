const express = require('express');
const router = express.Router();
const Order = require('../models/Order')
const socket = require('socket.io-client')('http://localhost:5200');
let currentOrderID = 0;
let connected = false;

socket.on('connect', function(){
  connected = true;
});
socket.on('disconnect', function(){
  connected = false;
});
socket.on('barcode', function(data){
  processScan(currentOrderID, data);
});


returnError = (res, message) => {
  res.status(200).send({
    success: false,
    timestamp: Date.now(),
    message: message
  })
}

processScan = (orderID, barcode) => {
  // process order
}

//Create
router.post('/currentOrder', (req,res) => {
  const {orderID} = req.body
  currentOrderID = orderID;
  console.log(`Listening for barcodes on #${orderID}`)
})


router.post('/', (req,res) => {
    const {orderID, productsList} = req.body
    const order = {
      orderID,
      status: "new",
      createdAt: Date.now(),
      completedAt: null,
      productFulfilled: false,
      products: []
    }
    order.products.push(productsList);
    Order.findOne({orderID})
      .then(doc => {
        if(doc) {
          returnError(res, "Order ID already exists!")
        } else {
          Order.create(order)
            .then(doc => {
              res.send(doc)
            })
            .catch(err => {
              returnError(res, `Error: ${err}`)
            })
        }
      })
      .catch(err => {
        returnError(res, `Error: ${err}`)
      })
});

//update
router.put('/order/:orderID', (req, res) => {
  const { orderID } = req.params
  Order.findOne({ orderID })
    .then(doc => {
      doc.status = "partial"
      doc.save();
      return res.send(doc);
    })
    .catch(err => {
      return res.send(err);
    })
})


//Read
router.get('/:id', (req,res) => {
  const { id } = req.params;
  const orderID = id;
  Order.findOne({orderID})
    .then(doc => {
      if(!doc) {
        res.status(200).send({
          success: false,
          timestamp: Date.now(),
          message: `Order #${id} not found`,
        })
      } else {
        res.status(200).send({
          success: true,
          timestamp: Date.now(),
          message: "Data recieved",
          data: doc
        })
      }
    })
    .catch(err => {
      res.status(200).send({
        success: false,
        timestamp: Date.now(),
        message: `Error: ${err}`,
      })
    })
})
//Delete
router.delete('/order/:orderID', (req, res) => {
  const {orderID} = req.params
  Order.findOne({orderID})
    .then(doc => {
      if(!doc) {
        returnError(res, `Order #${orderID} does not exist!`)
      } else {
        doc.delete();
        res.send({
          success: true,
          timestamp: Date.now(),
          message: `Order #${orderID} has been deleted`,
        });
      }
    })
    .catch(err => {
      returnError(res, `Error: ${err}`)
    })
})


module.exports = router;

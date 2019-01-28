const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
<<<<<<< HEAD
    id: Number,
    
})

module.exports = mongoose.model('Order', productSchema)
=======
  orderID: Number,
  createdAt: Number,
  completedAt: Number,
  status: String,
  products: Array
});

module.exports = mongoose.model('Order', orderSchema);
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6

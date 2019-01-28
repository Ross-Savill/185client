const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
<<<<<<< HEAD
    barcode: Number,
    productName: String,
    size: String,
    productCode: String,
    stockCount: Number,
})

module.exports = mongoose.model('Product', productSchema)
=======
  barcode:  Number,
  productName: String,
  size: String,
  color: String,
  aeroCode: String,
  stockCount: Number,

});

module.exports = mongoose.model('Product', productSchema);
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6

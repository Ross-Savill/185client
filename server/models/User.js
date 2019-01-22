const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:Number,
    email: String,
    password: String,
    role: String
})

module.exports = mongoose.model('User', userSchema)
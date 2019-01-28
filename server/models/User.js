const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
<<<<<<< HEAD
    id:Number,
    email: String,
    password: String,
    role: String
})

module.exports = mongoose.model('User', userSchema)
=======
  username: String,
  password: String,
  role: String,
});

module.exports = mongoose.model('User', userSchema);
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6

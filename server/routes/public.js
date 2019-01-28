<<<<<<< HEAD
const express = require ('express');
const router = express.Router();

=======
const express = require('express');
const router = express.Router();

router.get('/ping', (req,res) => {
  res.status(200).send({
    success: true,
    timestamp: Date.now(),
    message: 'pong'
  })
})
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6


module.exports = router;

const express = require ('express');
const router = express.Router();

// This is the controllers page

router.use('/', require('./public'))
router.use('/auth', require('./auth'))
router.use('/orders', require('./orders'))
router.use('/inventory', require('./inventory'))


module.exports = router;


<<<<<<< HEAD
const express = require ('express');
const router = express.Router();

// This is the controllers page

router.use('/', require('./public'))
router.use('/auth', require('./auth'))
router.use('/orders', require('./orders'))
router.use('/inventory', require('./inventory'))


module.exports = router;

=======
const express = require('express');
const router = express.Router();

router.use('/', require('./public'));
router.use('/auth', require('./auth'));
router.use('/inventory', require('./inventory'));
router.use('/orders', require('./orders'));

module.exports = router;
>>>>>>> 40576ab0d3d20e79a0256709fd1539a7651815d6

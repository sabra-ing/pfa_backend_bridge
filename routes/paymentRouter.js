const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');

router.post('/makePayment', paymentController.makePayment);

module.exports = router;

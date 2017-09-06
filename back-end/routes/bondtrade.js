const express = require('express');
const router = express.Router();
const {business: {bondtrade}} = require('../controller');

router
  .post('/sell', bondtrade.sell)
  .get('/all', bondtrade.getAll);

module.exports = router;

const express = require('express');
const router = express.Router();
const {business: {bondtrade}} = require('../controller');

router
  .post('/sell', bondtrade.sell)
  .get('/all', bondtrade.getAll)
  .get('/detail/:id', bondtrade.getDetail);

module.exports = router;

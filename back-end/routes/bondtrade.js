const express = require('express');
const router = express.Router();
const {business: {bondtrade}} = require('../controller');

router
  .post('/add', bondtrade.add)
  .get('/all', bondtrade.getAll);

module.exports = router;

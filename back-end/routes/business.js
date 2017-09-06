const express = require('express');
const router = express.Router();
const {business: {business}} = require('../controller');

router
  .get('/message', business.getAllRelatedMessages);

module.exports = router;

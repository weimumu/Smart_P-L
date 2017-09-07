const express = require('express');
const router = express.Router();
const {business: {business}} = require('../controller');

router
  .get('/messages', business.getAllRelatedMessages);

module.exports = router;

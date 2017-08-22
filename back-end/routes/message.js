const express = require('express');
const router = express.Router();
const {message} = require('../controller');

router
  .get('/friend', message.friendMessages)
  .get('/', message.messages);

module.exports = router;

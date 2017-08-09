const express = require('express');
const router = express.Router();
const {assert} = require('../lib');

router.get('/', (req, res, next) => {
  res.send('user');
});

router.get('/error', (req, res, next) => {
  assert(false, 'error from user');
});

module.exports = router;

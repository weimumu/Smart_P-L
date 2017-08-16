const express = require('express');
const router = express.Router();
const {verify, assert, asyncAssert, mongo: {User}} = require('../lib');

router.get('/:id', (req, res, next) => {
  res.send(req.params);
});

router.get('/error', (req, res, next) => {
  assert(false, 'error from user');
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await asyncAssert(user.validate(), 'validate error');
  await user.save();
  res.end(user._id.toString());
});

module.exports = router;

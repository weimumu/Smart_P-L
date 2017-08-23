const express = require('express');
const router = express.Router();
const {friend} = require('../controller');

router
  .get('/list', friend.getFriends)
  .post('/request', friend.request)
  .post('/accept/:id', friend.accept)
  .post('/refuse/:id', friend.refuse)
  .delete('/:id', friend.removeFriend);

module.exports = router;

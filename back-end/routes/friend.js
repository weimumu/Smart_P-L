const express = require('express');
const router = express.Router();
const {friend} = require('../controller');

router
  .get('/list', friend.getFriends)
  .post('/request', friend.request)
  .get('/request/send', friend.getRequestSend)
  .get('/request/receive', friend.getRequestRecv)
  .post('/request/:id/accept', friend.accept)
  .post('/request/:id/refuse', friend.refuse)
  .delete('/:id', friend.removeFriend);

module.exports = router;

const express = require('express');
const router = express.Router();
const {business: {loan}} = require('../controller');

router
  .post('/borrow', loan.borrow)
  .get('/borrow', loan.getMyBorrow)
  .post('/lend', loan.lend)
  .get('/lend', loan.getMyLend)
  .get('/recommend', loan.getRecommend)
  .get('/messages', loan.getRelatedMessages)
  .post('/request', loan.request)
  .post('/accept-request', loan.acceptRequest)
  .post('/transaction', loan.sendTransaction)
  .post('/accept-transaction', loan.acceptTransaction);

module.exports = router;

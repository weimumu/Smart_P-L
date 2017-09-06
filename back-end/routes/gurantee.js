const express = require('express');
const router = express.Router();
const {business: {gurantee}} = require('../controller');

router
  .post('/seek', gurantee.seek)
  .get('/seek', gurantee.getMySeek)
  .post('/offer', gurantee.offer)
  .get('/offer', gurantee.getMyOffer)
  .get('/recommend/single', gurantee.getRecommendSingle)
  .get('/recommend/multi', gurantee.getRecommendMulti)
  .get('/messages', gurantee.getRelatedMessages)
  .get('/detail/seek', gurantee.getSeek)
  .get('/detail/offer', gurantee.getOffer)
  .post('/request', gurantee.request)
  .post('/accept-request', gurantee.acceptRequest)
  .post('/transaction', gurantee.sendTransaction)
  .post('/accept-transaction', gurantee.acceptTransaction);

module.exports = router;

const express = require('express');
const router = express.Router();
const {timeline} = require('../controller');

router
  .get('/', timeline.getAllTimeline)
  .get('/me', timeline.getMyTimeline);

module.exports = router;

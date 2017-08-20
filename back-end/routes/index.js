const express = require('express');
const router = express.Router();
const {assert} = require('../lib');

/**
 * only routers in the whiteList are accessible without a logged-in state
 */
router.use((req, res, next) => {
  assert(res.locals.user || match(req), 'not logged in');
  next();
});

router
  .use('/user', require('./user'))
  .use('/friend', require('./friend'));

module.exports = router;

const whiteList = [
  {
    method: 'POST',
    path: '/user'
  },
  {
    method: 'POST',
    path: '/user/login'
  }
];

function match (req) {
  for (const config of whiteList) {
    if (config.method === req.method && config.path === req.path) return true;
  }
  return false;
}

const express = require('express');
const router = express.Router();
const {user} = require('../controller');
const {assert} = require('../lib');

router
  .post('/', user.regist)
  .post('/login', user.login);

/**
 * access control - all the apis below require a logged-in state
 */
router.use((req, res, next) => {
  assert(res.locals.user, 'not logged in');
});

router
  .get('/logout', user.logout)
  .put('/user/self', user.edit);

module.exports = router;

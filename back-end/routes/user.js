const express = require('express');
const router = express.Router();
const {user} = require('../controller');
const {assert} = require('../lib');

router
  .post('/', user.regist)
  .post('/login', user.login);

/**
 * access control - all the APIs below require a logged-in state
 */
router.use((req, res, next) => {
  assert(res.locals.user, 'not logged in');
  next();
});

router
  .get('/logout', user.logout)
  .put('/self', user.edit)
  .get('/self', user.getSelf);

module.exports = router;

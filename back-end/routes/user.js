const express = require('express');
const router = express.Router();
const {user} = require('../controller');

router
  .post('/', user.regist)
  .post('/login', user.login)
  .get('/logout', user.logout)
  .put('/self', user.edit)
  .get('/self', user.getSelf);

module.exports = router;

const express = require('express');
const router = express.Router();
const {user} = require('../controller');

router.post('/', user.regist);
router.post('/login', user.login);
router.get('/logout', user.logout);
router.put('/user/self', user.edit);

module.exports = router;

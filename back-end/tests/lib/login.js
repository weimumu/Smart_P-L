const ax = require('./axios');

module.exports = async user => {
  return ax.post('/user/login', user);
};

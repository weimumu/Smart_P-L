const assert = require('./assert');

module.exports = async (promise, message) => {
  try {
    await (promise instanceof Function ? promise() : promise);
  } catch (err) {
    assert(false, message);
  }
};

const assert = require('./assert');

module.exports = async (promise, message) => {
  try {
    const res = await (promise instanceof Function ? promise() : promise);
    assert(res, message);
  } catch (err) {
    assert(false, message);
  }
};

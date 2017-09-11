const assert = require('assert');

module.exports = async (request, regexp) => {
  try {
    await request;
    throw new Error('no throw');
  } catch (err) {
    const res = err.response;
    assert(res.status === 400, 'not a 400 response');
    assert(res.data.match(regexp), `unmatched error message: ${res.data} vs ${regexp}`);
  }
};

const {assert} = require('../lib');

exports.getMyTimeline = async (req, res) => {
  const {page, size} = req.query;
  assert(!isNaN(page) && Number(page) >= 0, 'non-negative query parameter page required');
  assert(!isNaN(size) && Number(size) > 0, 'positive query parameter size required');

  res.json(await res.locals.user.getSelfTimeline(size, page));
};

exports.getAllTimeline = async (req, res) => {
  const {page, size} = req.query;
  assert(!isNaN(page) && Number(page) >= 0, 'non-negative query parameter page required');
  assert(!isNaN(size) && Number(size) > 0, 'positive query parameter size required');

  res.json(await res.locals.user.getFriendTimeline(size, page));
};

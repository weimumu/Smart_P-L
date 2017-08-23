const {assert} = require('../lib');
const {fields} = require('../config');

exports.friendMessages = async (req, res) => {
  const {page, size} = req.query;
  assert(!isNaN(page) && Number(page) >= 0, 'non-negative query parameter page required');
  assert(!isNaN(size) && Number(size) > 0, 'positive query parameter size required');

  const user = await res.locals.user
    .populate({
      path: 'friendMessages',
      options: {
        limit: size,
        skip: page * size
      },
      populate: {
        path: 'from',
        select: fields.stranger
      }
    })
    .execPopulate();
  res.json(user.friendMessages);
};

exports.messages = async (req, res) => {
  const {page, size} = req.query;
  assert(!isNaN(page) && Number(page) >= 0, 'non-negative query parameter page required');
  assert(!isNaN(size) && Number(size) > 0, 'positive query parameter size required');

  const user = await res.locals.user
    .populate({
      path: 'messages',
      options: {
        limit: size,
        skip: page * size
      },
      populate: {
        path: 'from',
        select: fields.stranger
      }
    })
    .execPopulate();
  res.json(user.friendMessages);
};

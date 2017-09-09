const {mongo: {Bond, TimelineItem}, assert} = require('../../lib');
const {ObjectId} = require('mongoose').Types;
const _ = require('lodash');

exports.sell = async (req, res) => {
  const data = _.pick(
    req.body,
    [
      'company_lend',
      'company_borrow',
      'amount',
      'loan_owner',
      'loan_amount',
      'loan_ddl',
      'loan_source',
      'situation_borrower',
      'loan_price'
    ]
  );
  data.from = res.locals.user._id;
  const bondInstance = new Bond(data);
  assert(!(bondInstance.validateSync() instanceof Error), 'invalid data');

  const timelineItem = new TimelineItem({
    from: res.locals.user._id,
    type: 'BondSell',
    info: {
      bondId: bondInstance._id
    }
  });

  await Promise.all(
    [
      bondInstance.save(),
      res.locals.user.addTimeline(timelineItem)
    ]
  );

  res.json(bondInstance._id);
};

exports.getAll = async (req, res) => {
  const {page, size} = req.query;
  assert(!isNaN(page) && Number(page) >= 0, 'non-negative query parameter page required');
  assert(!isNaN(size) && Number(size) > 0, 'positive query parameter size required');

  res.json(await Bond
    .find({})
    .limit(Number(size))
    .skip(Number(page) * Number(page))
  );
};

exports.getDetail = async (req, res) => {
  const {id} = req.params;
  assert(ObjectId.isValid(id), 'invalid bondtrade-id');

  res.json(await Bond.findById(id));
};

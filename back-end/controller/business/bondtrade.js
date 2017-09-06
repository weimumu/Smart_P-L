const {mongo: {User, Bond, Message, TimelineItem}, assert} = require('../../lib');
const _ = require('lodash');

exports.add = async (req, res) => {
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

  await bondInstance.save();

  res.json(bondInstance._id);
};

exports.getAll = async (req, res) => {
  const {page, size} = req.query;
  assert(!isNaN(page) && Number(page) >= 0, 'non-negative query parameter page required');
  assert(!isNaN(size) && Number(size) > 0, 'positive query parameter size required');

  res.json(await Bond.find({}).limit(Number(size)).skip(Number(page) * Number(page)));
};

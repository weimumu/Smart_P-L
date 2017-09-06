const {mongo: {User}} = require('../../lib');
const _ = require('lodash');

exports.getAllRelatedMessages = async (req, res) => {
  const loanMsg = (await User.findById(res.locals.user._id).populate({
    path: 'messages',
    match: {
      type: /^Borrow|^Publish-Lend|^Publish-Borrow/
    },
    populate: {
      path: 'info.transactionId',
      model: 'LoanTransaction'
    }
  })).messages;
  const gurMsg = (await User.findById(res.locals.user._id).populate({
    path: 'messages',
    match: {
      type: /^Gurantee|^Publish-Gurantee/
    },
    populate: {
      path: 'info.transactionId',
      model: 'GuranteeTransaction'
    }
  })).messages;

  res.json(
    _.chain([...loanMsg, ...gurMsg]).sortBy(o => o.date).reverse().value()
  );
};

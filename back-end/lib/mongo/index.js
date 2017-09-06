const mongoose = require('mongoose');
const {mongo} = require('../../config');
const logger = require('../log');
const schemas = require('./schemas');

mongoose.Promise = Promise;

mongoose.connect(`mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.db}?authSource=admin`, {
  useMongoClient: true
});

mongoose.connection.on('open', err => {
  if (!err) logger.info('successfully connected to MongoDB.');
  else logger.error(err);
});

mongoose.model('User', schemas.User);
mongoose.model('FriendRequest', schemas.FriendRequest);
mongoose.model('Message', schemas.Message);
mongoose.model('Borrow', schemas.loan.Borrow);
mongoose.model('Lend', schemas.loan.Lend);
mongoose.model('LoanTransaction', schemas.loan.LoanTransaction);
mongoose.model('TimelineItem', schemas.TimelineItem);
mongoose.model('GuranteeOffer', schemas.gurantee.Offer);
mongoose.model('GuranteeSeek', schemas.gurantee.Seek);
mongoose.model('GuranteeTransaction', schemas.gurantee.GuranteeTransaction);

module.exports = {
  User: mongoose.model('User'),
  FriendRequest: mongoose.model('FriendRequest'),
  Message: mongoose.model('Message'),
  Borrow: mongoose.model('Borrow'),
  Lend: mongoose.model('Lend'),
  LoanTransaction: mongoose.model('LoanTransaction'),
  TimelineItem: mongoose.model('TimelineItem'),
  GuranteeOffer: mongoose.model('GuranteeOffer'),
  GuranteeSeek: mongoose.model('GuranteeSeek'),
  GuranteeTransaction: mongoose.model('GuranteeTransaction')
};

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

module.exports = {
  User: mongoose.model('User'),
  FriendRequest: mongoose.model('FriendRequest'),
  Message: mongoose.model('Message')
};

const mongoose = require('mongoose');
const {mongo} = require('../config');
const logger = require('./log');

mongoose.connect(`mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.db}?authSource=admin`, {
  useMongoClient: true
});

mongoose.connection.on('open', err => {
  if (!err) logger.info('ok');
  else logger.error(err);
});

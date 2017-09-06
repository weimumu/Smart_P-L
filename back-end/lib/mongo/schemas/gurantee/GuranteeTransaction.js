const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GuranteeTransaction = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  offer: {
    type: ObjectId,
    ref: 'GuranteeOffer',
    required: true
  },
  seek: {
    type: ObjectId,
    ref: 'GuranteeSeek',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Request', 'Progressing', 'Refused', 'Completed'],
    default: 'Request'
  }
});

module.exports = GuranteeTransaction;

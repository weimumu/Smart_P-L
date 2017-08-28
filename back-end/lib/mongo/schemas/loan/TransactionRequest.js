const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TransactionRequest = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  lend: {
    type: ObjectId,
    ref: 'Lend',
    required: true
  },
  borrow: {
    type: ObjectId,
    ref: 'Borrow',
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

module.exports = TransactionRequest;

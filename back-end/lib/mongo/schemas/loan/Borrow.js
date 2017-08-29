const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Borrow = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: String,
    required: true
  },
  max_amount: {
    type: Number,
    required: true
  },
  max_rate: {
    type: Number,
    required: true
  },
  loan_ddl: {
    type: Number,
    required: true
  },
  city: String,
  reason: String,
  other_detail: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Borrow;

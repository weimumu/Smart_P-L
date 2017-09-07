const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Offer = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  amount_gurantee: {
    type: Number,
    required: true
  },
  loan_ddl: {
    type: Number,
    required: true
  },
  min_rate: Number,
  neither: Boolean,
  mortgage: Boolean,
  pledge: Boolean,
  both: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Offer;

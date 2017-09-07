const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Seek = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  city: String,
  project: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  amount_gurantee: {
    type: Number,
    required: true
  },
  rate_gurantee: {
    type: Number,
    required: true
  },
  loan_ddl: {
    type: Number,
    required: true
  },
  other_detail: String,
  guarantee_way: String,
  mortgage: Number,
  mortgage_fixed: Boolean,
  mortgage_other: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Seek;

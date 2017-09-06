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
  mortgage_value: Number,
  guarentee_amount: Number,
  supportSales: Boolean,
  supportOther: Boolean,
  risk_factor: Number,
  total_risk_factor: Number,
  mortgage: Boolean,
  guarentee: Boolean,
  mortgage_fixed: Boolean,
  mortgage_other: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Borrow;

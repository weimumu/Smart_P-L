const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Lend = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  max_amount: {
    type: String,
    required: true
  },
  loan_ddl: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Lend;

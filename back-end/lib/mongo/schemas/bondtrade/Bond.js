const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Borrow = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Borrow;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Borrow = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  company_lend: String,
  company_borrow: String,
  amount: String,
  loan_owner: String,
  loan_amount: String,
  loan_ddl: String,
  loan_source: String,
  situation_borrower: String,
  loan_price: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Borrow;

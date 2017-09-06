const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TimelineItem = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'Borrow',
      'Lend',
      'GuranteeSeek',
      'GuranteeOffer',
      'Bondtrade'
    ],
    required: true
  },
  info: Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = TimelineItem;

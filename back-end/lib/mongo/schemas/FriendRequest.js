const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FriendRequest = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = FriendRequest;

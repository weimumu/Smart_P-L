const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  from: {
    type: ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    required: true,
    enum: [
      // 'FriendRequest-Sent',
      'FriendRequest-Received',
      'FriendRequest-Accepted',
      'FriendRequest-Refused'
    ]
  },
  info: Schema.Types.Mixed,
  read: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = messageSchema;

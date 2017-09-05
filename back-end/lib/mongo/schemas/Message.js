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
      // 'FriendRequest-Sent', // when a request is sent
      'FriendRequest-Received', // when received a request
      'FriendRequest-Received&Accepted', // when received & accepted a request
      'FriendRequest-Received&Refused', // when received & refused a request
      'FriendRequest-Accepted', // when a request one sent is accepted
      'FriendRequest-Refused', // when a request one sent is refused
      'BorrowRequest-Sent',
      'BorrowRequest-Received',
      'BorrowRequest-Received&Accepted',
      'BorrowRequest-Received&Refused',
      'BorrowRequest-Accepted',
      'BorrowRequest-Refused',
      'BorrowContract-Sent',
      'BorrowContract-Received',
      'BorrowContract-Received&Accepted',
      'BorrowContract-Received&Refused',
      'BorrowContract-Accepted', // transaction done
      'BorrowContract-Refused',
      'Publish-Lend',
      'Publish-Borrow',
      'Borrow-Completed'
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

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

// FriendRequest.index({from: 1, to: 1}, {unique: true});

let userModel = null;
FriendRequest.pre('remove', async function (next) {
  if (!userModel) userModel = mongoose.model('User');
  await Promise.all([
    userModel.updateOne({_id: this.from}, {$pull: {'friend.requestSend': this._id}}),
    userModel.updateOne({_id: this.to}, {$pull: {'friend.requestRecv': this._id}})
  ]);
  next();
});

module.exports = FriendRequest;

const {assert, mongo: {User, FriendRequest, Message}} = require('../lib');
const {fields} = require('../config');
const {ObjectId} = require('mongoose').Types;

exports.getFriends = async (req, res) => {
  const result = await User
    .findById(res.locals.user._id, 'friends')
    .populate({
      path: 'friends',
      select: fields.friend
    });
  res.json(result.friends);
};

exports.removeFriend = async (req, res) => {
  const {id} = req.params;
  assert(ObjectId.isValid(id), 'invalid id');
  await Promise.all([
    User.where('_id', res.locals.user._id).update({$pull: {'friends': id}}),
    User.where('_id', id).update({$pull: {'friends': res.locals.user._id}})
  ]);
  res.end('ok');
};

exports.request = async (req, res) => {
  const {to} = req.query;
  const self = res.locals.user;
  assert(to, 'to user required');
  assert(to.toString() !== self._id.toString(), 'request to self is forbidden');
  const toUser = await User.findById(to);
  assert(toUser, 'user not exists');
  assert((await FriendRequest.where().or({from: self._id, to}).or({from: to, to: self._id})).length === 0, 'no duplicate request');
  try {
    const request = new FriendRequest({from: self._id, to});
    const receiverMessage = new Message({
      from: self._id,
      type: 'FriendRequest-Received',
      info: {
        request: request._id
      }
    });
    await Promise.all([
      request.save(),
      receiverMessage.save(),
      prependFriendMsg(to, receiverMessage)
    ]);
    res.end('ok');
  } catch (err) {
    console.error(err);
    assert(false, 'data error');
  }
};

exports.accept = async (req, res) => {
  const self = res.locals.user;
  const {id} = req.params;
  assert(ObjectId.isValid(id), 'invalid id');
  const friendRequestMsg = await Message.findById(id);
  assert(friendRequestMsg && friendRequestMsg.type === 'FriendRequest-Received', 'msg not found or invalid msg');
  const request = await FriendRequest.findById(friendRequestMsg.info.request);
  assert(request.to.toString() === self._id.toString(), 'friend request not found'); // not yours

  const message = new Message({
    from: self._id,
    type: 'FriendRequest-Accepted'
  });
  await Promise.all([
    message.save(),
    friendRequestMsg.update({
      $set: {type: 'FriendRequest-Received&Accepted'},
      $unset: {info: ''}
    }),
    User.update({_id: request.from}, {
      $addToSet: {'friends': request.to},
      $push: {
        'friendMessages': {
          $each: [message._id],
          $position: 0 // prepend
        }
      }
    }),
    User.where('_id', request.to).update({$addToSet: {'friends': request.from}}),
    request.remove()
  ]);
  res.end('ok');
};

exports.refuse = async (req, res) => {
  const self = res.locals.user;
  const {id} = req.params;
  assert(ObjectId.isValid(id), 'invalid id');
  const friendRequestMsg = await Message.findById(id);
  assert(friendRequestMsg && friendRequestMsg.type === 'FriendRequest-Received', 'msg not found or invalid msg');
  const request = await FriendRequest.findById(friendRequestMsg.info.request);
  assert(request.to.toString() === self._id.toString(), 'friend request not found'); // not yours

  const message = new Message({
    from: self._id,
    type: 'FriendRequest-Refused'
  });
  await Promise.all([
    message.save(),
    friendRequestMsg.update({
      $set: {type: 'FriendRequest-Received&Refused'},
      $unset: {info: ''}
    }),
    prependFriendMsg(request.from, message),
    request.remove()
  ]);
  res.end('ok');
};

async function prependFriendMsg (id, message) {
  return User.update({_id: id}, {
    $push: {
      'friendMessages': {
        $each: [message._id],
        $position: 0 // prepend
      }
    }
  });
}

const {assert, mongo: {User, FriendRequest}} = require('../lib');
const {fields} = require('../config');
const {ObjectId} = require('mongoose').Types;

exports.getFriends = async (req, res) => {
  const result = await User
    .findById(res.locals.user._id, 'friend.list')
    .populate({
      path: 'friend.list',
      select: fields.friend
    });
  res.json(result.friend.list);
};

exports.removeFriend = async (req, res) => {
  const {id} = req.params;
  assert(ObjectId.isValid(id), 'invalid id');
  await Promise.all([
    User.where('_id', res.locals.user._id).update({$pull: {'friend.list': id}}),
    User.where('_id', id).update({$pull: {'friend.list': res.locals.user._id}})
  ]);
  res.end('ok');
};

exports.request = async (req, res) => {
  const {to} = req.query;
  const self = res.locals.user;
  assert(to, 'to user required');
  assert(to.toString() !== self._id.toString(), 'request to self is forbidden');

  assert((await FriendRequest.where().or({from: self._id, to}).or({from: to, to: self._id})).length === 0, 'no duplicate request');
  try {
    const request = await FriendRequest.create({
      from: self._id,
      to
    });
    await Promise.all([
      User.where('_id', to).update({$push: {'friend.requestRecv': request._id}}),
      User.where('_id', self._id).update({$push: {'friend.requestSend': request._id}})
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
  const request = await FriendRequest.findById(id);
  assert(request, 'friend request not found');
  assert(request.to.toString() === self._id.toString(), 'friend request not found'); // not yours

  await Promise.all([
    User.where('_id', request.from).update({$addToSet: {'friend.list': request.to}}),
    User.where('_id', request.to).update({$addToSet: {'friend.list': request.from}}),
    request.remove()
  ]);
  // TODO: send message?
  res.end('ok');
};

exports.refuse = async (req, res) => {
  const self = res.locals.user;
  const {id} = req.params;
  assert(ObjectId.isValid(id), 'invalid id');
  const request = await FriendRequest.findById(id);
  assert(request, 'friend request not found');
  assert(request.to.toString() === self._id.toString(), 'friend request not found'); // not yours

  await request.remove();
  res.end('ok');
};

exports.getRequestRecv = async (req, res) => {
  const id = res.locals.user._id;
  const result = await User
    .findById(id, ['friend.requestRecv'])
    .populate({
      path: 'friend.requestRecv',
      select: ['from', 'date'],
      populate: [
        {
          path: 'from',
          select: fields.stranger
        }
      ]
    });
  res.json(result.friend.requestRecv);
};

exports.getRequestSend = async (req, res) => {
  const id = res.locals.user._id;
  const result = await User
    .findById(id, ['friend.requestSend'])
    .populate({
      path: 'friend.requestSend',
      select: ['to', 'date'],
      populate: [
        {
          path: 'to',
          select: fields.stranger
        }
      ]
    });
  res.json(result.friend.requestSend);
};

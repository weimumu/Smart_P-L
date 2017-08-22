const _ = require('lodash');
const {assert, asyncAssertThrow, mongo: {User}} = require('../lib');
const {fields} = require('../config');
const excapeRegExp = require('escape-string-regexp');
const {ObjectId} = require('mongoose').Types;

/**
 * regist
 */
exports.regist = async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  await asyncAssertThrow(user.validate(), 'validate error');
  assert(!await User.findOne({userEmail: user.userEmail}), 'registed email');
  assert(!await User.findOne({comName: user.comName}), 'registed com');
  await user.save();
  res.end('ok');
};

/**
 * login
 */
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    assert(email, 'email required');
    assert(password, 'password required');
    const user = await User.findOne({
      userEmail: email,
      userPass: password
    });
    assert(user, 'login failed');
    req.session._id = user._id;
    res.end('ok');
  } catch (err) {
    req.session.destroy(); // clear session for whatever error
    throw err;
  }
};

/**
 * logout
 */
exports.logout = async (req, res) => {
  req.session.destroy();
  res.end('ok');
};

exports.edit = async (req, res) => {
  const option = _.pick(req.body, [
    'userPass',
    'comName',
    'comCode',
    'comCapital',
    'comTime',
    'comPerson',
    'comEmail',
    'comPhone',
    'comManager',
    'comRegistAddresss',
    'comWorkAddresss',
    'comField',
    'comProduct',
    'comIntro',
    'contactName',
    'contactJob',
    'contactMobile',
    'contactEmail',
    'contactQQ',
    'contactPhone'
  ]);
  await User.update(
    {_id: res.locals.user._id},
    {
      $set: option
    }
  );
  res.end('ok');
};

exports.getSelf = async (req, res) => {
  const user = res.locals.user;
  const filtered = _.omit(user, 'userPass');
  res.json(filtered);
};

exports.search = async (req, res) => {
  const {q} = req.query;
  assert(q, 'search key required');
  const result = await User
    .find({
      comName: {
        '$regex': excapeRegExp(q)
      }
    }, fields.stranger)
    .limit(20);
  res.json(result);
};

exports.getInfo = async (req, res) => {
  const {id} = req.params;
  assert(ObjectId.isValid(id), 'invalid id');
  if (res.locals.user.isFriend(id)) {
    // getting friend's info
    res.json(await User.findById(id, fields.friend));
  } else {
    // getting stranger's info
    res.json(await User.findById(id, fields.stranger));
  }
};

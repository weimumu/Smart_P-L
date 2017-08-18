const _ = require('lodash');
const {assert, asyncAssertThrow, mongo: {User}} = require('../lib');

/**
 * regist
 */
exports.regist = async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  await asyncAssertThrow(user.validate(), 'validate error');
  assert(!await User.findOne({userEmail: user.userEmail}), 'registed email');
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

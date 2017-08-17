const {assert, asyncAssertThrow, mongo: {User}} = require('../lib');

/**
 * regist
 */
exports.regist = async (req, res) => {
  const user = new User(req.body);
  await asyncAssertThrow(user.validate(), 'validate error');
  assert(!await User.findOne({userEmail: user.userEmail}), 'registed email');
  await user.save();
  res.end('ok');
};

/**
 * login
 */
exports.login = async (req, res) => {
  req.session.destroy(); // logout before login
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
};

/**
 * logout
 */
exports.logout = async (req, res) => {
  assert(res.locals.user, `you're not logged in`);
  req.session.destroy();
  res.end('ok');
};

exports.edit = async (req, res) => {
  assert(false, 'not implemented');
};

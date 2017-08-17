const express = require('express');
require('express-async-errors');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const isDev = process.env.NODE_ENV !== 'production';
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// 初始化并连接数据库
require('./lib/mongo');

const app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'sparklefish',
  store: new MongoStore({
    mongooseConnection: require('mongoose').connection
  }),
  // maxAge: 24 * 3600 * 1000, // one day
  secure: true,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, '/public')));

// auto login
const {mongo: {User}} = require('./lib');
app.use(async (req, res, next) => {
  if (req.session._id) {
    const user = await User.findOne({_id: req.session._id});
    if (user) res.locals.user = user;
  }
  next();
});
app.use('/api', require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status);
  if (err.status) {
    // 自己扔的异常
    res.status(err.status);
    res.send(err.message);
  } else {
    res.status(500);
    if (isDev) {
      console.error(err);
    }
    res.send('Internal Server Error');
  }
});

module.exports = app;

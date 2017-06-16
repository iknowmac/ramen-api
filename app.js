require('dotenv').load({ path: '.env' });
require('./globals').load();
require('./db').load(process.env.NODE_ENV);

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');
var nunjucks = require('nunjucks');

var allowCrossDomain = require('./middleware').allowCrossDomain;

var app = express();

// view engine setup
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  noCache: true,
  express: app,
});
app.set('view engine', 'html');

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// dynamically include routes (Controllers)
const ctrlDir = path.join(__dirname, 'controllers/');
fs.readdirSync(ctrlDir).forEach(function (file) {
  if (file.substr(-3) == '.js') {
    const route = require(ctrlDir + file);
    route.controller(app);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

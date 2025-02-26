var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');
var sasamoRouter = require('./routes/sasamo');
var adminRouter = require('./routes/sasamo_admin');


var app = express();
app.use(require('connect-history-api-fallback')());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/api/movies', moviesRouter);
app.use('/api/sasamo', sasamoRouter);
app.use('/api/admin', adminRouter);
app.use(express.static('public'))

// app.use('url', file) url로 접근할 때, file을 사용한다.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

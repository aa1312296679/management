var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var departments=require('./routes/departments');
var groupRouter=require('./routes/group');
var session=require('express-session');
var FileStore=require('session-file-store')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//配置express框架的cookie
app.use(cookieParser());
//配置express框架的session
app.use(session({
    name:"sessionId",
    secret:"session",
    store:new FileStore(),
    resave:false,
    saveUninitialized:false,
    //设置session cookie生命周期为30分钟
    cookie:{
      maxAge:1*1000*60*30
    }
}));

//1.express框架以根路径为路由文件的统一访问路径
//2.将多个路由文件托管到服务器端的根路径
app.use('/', [indexRouter,usersRouter,groupRouter,departments]);

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
 return res.render('error');
});

module.exports = app;

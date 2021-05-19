var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var blogHomeRouter = require('./routes/action/home');
let loginRouter = require('./routes/action/login');
let registerRouter = require('./routes/action/register')
let blogArticleRouter = require('./routes/action/article')
let blogAboutRouter = require('./routes/action/about')
let blogDetailRouter = require('./routes/action/detail')
let blogResourceRouter = require('./routes/action/resource')
let blogTilelineRouter = require('./routes/action/timeline')
let managerLoginRouter = require('./routes/action/manager_login')
let managerArticleRouter = require('./routes/action/managerArticle')
let managerMainRouter = require('./routes/action/managerMain')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session setup
app.use(cookieParser());
app.use(session({
  secret: 'loginSession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000000
  },
  rolling: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', blogHomeRouter);
app.use('/', loginRouter)
app.use('/register', registerRouter)
app.use('/article', blogArticleRouter)
app.use('/about', blogAboutRouter)
app.use('/detail', blogDetailRouter)
app.use('/resource', blogResourceRouter)
app.use('/timeline', blogTilelineRouter)
app.use('/managerLogin', managerLoginRouter)
app.use('/managerArticle', managerArticleRouter)
app.use('/managerMain', managerMainRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

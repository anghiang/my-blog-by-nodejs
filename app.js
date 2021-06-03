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
let managerAddarticleRouter = require('./routes/action/managerAddarticle')
let managerDeleteArticleRouter = require('./routes/action/managerDeleteArticle')
let managerUpdateArticleRouter = require('./routes/action/managerUpdateArticle')
let managerSearchArticleRouter = require('./routes/action/managerSearchArticle')
let manageUserRouter = require('./routes/action/manage_user')
let loginlogRouter = require('./routes/action/loginlog')
let managerCommentRouter = require('./routes/action/manager_comment')
let managerSearchCommentRouter = require('./routes/action/managerSearchComment')
let managerDeleteCommentRouter = require('./routes/action/managerDeleteComment')
let managerSeekCommentRouter = require('./routes/action/managerSeekComment')
let managerDeleteUserRouter = require('./routes/action/managerDeleteUser')
let managerSearchUserRouter = require('./routes/action/managerSearchUser')
let deleteLoginLogRouter = require('./routes/action/deleteLoginLog')
let searchLoginLogRouter = require('./routes/action/searchLoginLog')
let enterErrorRouter = require('./routes/action/enterError')
let exitLoginRouter = require('./routes/action/exitLogin')
let updateImgRouter = require('./routes/action/updateImg')
let addArticleRouter = require('./routes/action/addArticle')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session setup
app.use(cookieParser('user'));
app.use(session({
  secret: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
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
app.use('/managerAdd-article', managerAddarticleRouter)
app.use('/managerDelete-article', managerDeleteArticleRouter)
app.use('/managerUpdate-article', managerUpdateArticleRouter)
app.use('/managerSearch-article', managerSearchArticleRouter)
app.use('/manageUser', manageUserRouter)
app.use('/loginlog', loginlogRouter)
app.use('/managerComment', managerCommentRouter)
app.use('/managerSearchComment', managerSearchCommentRouter)
app.use('/managerDeleteComment', managerDeleteCommentRouter)
app.use('/managerSeekComment', managerSeekCommentRouter)
app.use('/managerDeleteUser', managerDeleteUserRouter)
app.use('/managerSearchUser', managerSearchUserRouter)
app.use('/deleteLoginLog', deleteLoginLogRouter)
app.use('/searchLoginLog', searchLoginLogRouter)
app.use('/enterError', enterErrorRouter)
app.use('/exitLogin', exitLoginRouter)
app.use('/updateImg', updateImgRouter)
app.use('/addAticle', addArticleRouter)






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

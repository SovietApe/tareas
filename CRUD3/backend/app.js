var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const session = require('express-session');
const { createPoolCluster } = require('mysql');
const { Cookie } = require('express-session');
const Handlebars = require("handlebars");
var fileupload = require('express-fileupload')
var cors = require('cors')
var pool = require('./models/bd');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login')
var adminRouter = require('./routes/admin/novedades');
var formRouter = require('./routes/form')
var apiRouter = require('./routes/api')
const { secureHeapUsed } = require('crypto');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Pj5DbpACGHas7dHB',
  cookie: {maxAge: null},
  saveUninitialized: true
}))

secured = async (req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else{
      res.redirect('/admin/login');
    }
  } catch (error){
      console.log(error)
    }
  }

  app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);
app.use('/formulario', formRouter)
app.use('/api', cors(), apiRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*Arrancan las consultas*/
//select
pool.query('select * from usuarios').then(function(resultados){
  console.log(resultados)
})
pool.query('select * from novedades').then(function(resultados){
  console.log(resultados)
})

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

module.exports = async function(){
  //So, I will be using webstorm IDE to generate a Express App
  // to make the tutorial faster
  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');

  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  //To initialize the module we need to pass on the setup the config data of your database
  //For this tutorial I will be using mariaDB
  const db = {
    "host":'127.0.0.1',
    "port":3306,
    "user":'root',
    "password":'1234',
    "connectionLimit": 5,
    "database":'tutorial1',
    "dbms": 'mariadb'
  }

  //initializing/setting up Authization module
  //our module is async, as so you will need to adapt your app to handle his async aspect
  //in this case because I cannot use await out of an async function I need to transform this file in an async function
  //I will also need to update the www.js file that is using this app.js file
  var mod = await require('@authization/authization').setup({app,db});
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  //Basically from now on you are free to use our data model
  //by simply doing mod.user, mod.role, mode.permission ...
  //but if you want to use our authentication middlewares that checks if a user is authenticated and if he owns permission to access each resource,
  // you will need to set the endpoints as '/api' because we currently only check authentication in all endpoints that start with '/api'

  //Because we need to send authization to the routers so we can use the module data models on the routers we will also turn the routers into functions

  //all endpoints in this router will not have the middlewares check if the user is authenticated
  app.use('/', indexRouter(mod));
  //all endpoints in this router will have the middlewares check if the user is authenticated
  app.use('/api', usersRouter(mod));

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

  return app;
};

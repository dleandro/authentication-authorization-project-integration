'use strict'

const
passport = require('./passport/passport'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
//session = require('express-session'),
cookie_session=require('cookie-session'),
cookie_secret = 'justasecretstring', // should change after a while if it has some security implication  openssl rand -hex 32 on the cmd
config = require('../config/config')
//MySQLStore = require('express-mysql-session')(session),
//sessionStore = new MySQLStore(config.database_opts)

// This module is used to setup middleware on the app passed as a parameter
module.exports = function(app) {
    
    // app configurations
    app.use(require('cors')())
    app.use(bodyParser.json()) // Makes it easier to manage the request's body
    app.use(cookieParser())
    
    /*app.use(session({
        resave: false, // to keep session active instead of letting it change to the idle state
        //saveUninitialized to false to only create a session if a UA(User agent) made a login
        saveUninitialized: false,
        //store: sessionStore,
        secret: cookie_secret
    }))*/

    app.use(cookie_session({
        maxAge:24*60*60*1000,
        keys:['isthisaneasteregg?']
    }))
    
    app.use(passport.initialize())
    app.use(passport.session())
    
}
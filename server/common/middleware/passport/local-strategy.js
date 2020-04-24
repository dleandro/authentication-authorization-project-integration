'use strict'

const 
LocalStrategy = require('passport-local').Strategy,
passportUtils = require('../../util/passport-utils')

const strategy = new LocalStrategy(
    function(username, password, done) {
        passportUtils.findCorrespondingUser(username, password)
        .then(user => done(null, user))
        .catch(err => done(err))
    }
    )
    
    
    module.exports = strategy
'use strict'

const
passport = require('passport'),
passportUtils = require('../../util/passport-utils')

passport.use('saml', require('./saml-strategy'))
passport.use('openid', require('./open-id-strategy'))
passport.use('azure_ad_oauth2', require('./azure-ad-oauth2-strategy'))
passport.use('google', require('./google-strategy'))
passport.use('local', require('./local-strategy'))

function refToUser(userRef, done) {
  passportUtils.findUser(userRef)
  .then(user => (user) ? done(null, user):done('User unknown'))
}

function userToRef(user, done) {
  done(null, user.id);
}

passport.serializeUser(userToRef);
passport.deserializeUser(refToUser);

module.exports = passport
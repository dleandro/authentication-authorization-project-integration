'use strict'

const
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    passportUtils = require('../../util/passport-utils'),
    config = require('../../config/config')


const strategy = new GoogleStrategy({
    clientID: config.google.google_client_id,
    clientSecret: config.google.google_client_secret,
    callbackURL: config.google.callbackURL
},
    async function (accessToken, refreshToken, profile, done) {
        var user = await passportUtils.findUserByIdp(profile.id)

        if (!user) {
            user = await passportUtils.createUser(profile.id, 'google', profile.displayName, null)
        }

        done(null, user)
    }
)

module.exports = strategy
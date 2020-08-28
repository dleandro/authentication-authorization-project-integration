const GoogleStrategy = require('passport-google-oauth20').Strategy,
    {google} = require('../../../config/config'),
    strategyCallback= require('./strats-utils');

const googleStratBuilder = () =>new GoogleStrategy({clientID: google.google_client_id, clientSecret: google.google_client_secret, callbackURL: google.callbackUrl,},
    (accessToken, refreshToken, profile, done) =>strategyCallback(profile.id, 'google', profile.displayName, 'EasterEgg123','oauth2','google',done));

module.exports= googleStratBuilder;

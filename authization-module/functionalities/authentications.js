'use strict'

const passport = require('passport')

module.exports = {


    usingLocal: (req, res, next) => {

        passport.authenticate('local', { failWithError: true })(req, res, next)
    },

    usingGoogle: (req, res, next) => {

        passport.authenticate('google', { scope: ['profile'] })(req, res, next)
    },

    usingGoogleCallback: (req, res, next) => {
        passport.authenticate('google', { failureRedirect: '/login' })(req, res, next)
    },

    usingSaml: (req, res, next) => {

        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })(req, res, next)

    },

    usingSamlCallback: (req, res, next) => {
        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })(req, res, next)

    },

    usingOpenId: (req, res, next) => {

    },

    usingOffice365: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2')(req, res, next)

    },

    usingOffice365Callback: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2')(req, res, next)

    },

    logout: (req, res, next) => {
        req.logout()
        req.session.destroy((err) => {
            
            if (err) {
                next(err)
            }

            next()
        })

        
    }

}
'use strict'

const passport = require('passport')
/**
 *
 * @type {{
 * usingSamlCallback: usingSamlCallback,
 * usingSaml: usingSaml,
 * logout: logout,
 * usingGoogleCallback: usingGoogleCallback,
 * usingOffice365: usingOffice365,
 * usingOpenId: usingOpenId,
 * usingLocal: usingLocal,
 * usingOffice365Callback: usingOffice365Callback,
 * usingGoogle: usingGoogle}}
 */
module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingLocal: (req, res, next) => {

        passport.authenticate('local', { failWithError: true })(req, res, next)
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingGoogle: (req, res, next) => {

        passport.authenticate('google', { scope: ['profile'] })(req, res, next)
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingGoogleCallback: (req, res, next) => {
        passport.authenticate('google', { failWithError: true })(req, res, next)
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingSaml: (req, res, next) => {

        passport.authenticate('saml')(req, res, next)

    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingSamlCallback: (req, res, next) => {
        passport.authenticate('saml', { failWithError: true })(req, res, next)
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingOpenId: (req, res, next) => {

    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingOffice365: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2')(req, res, next)


    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    usingOffice365Callback: (req, res, next) => {
        passport.authenticate('azure_ad_oauth2', { failWithError: true })(req, res, next)

    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
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
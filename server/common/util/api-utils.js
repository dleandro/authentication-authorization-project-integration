'use strict'

const config = require('../config/config')

module.exports = {
    
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated() || config.env === config.test) { return next(); }
        res.send({response: 'Requires Authentication'})
    },
    
    // TODO: probably should have a function that calls auth module and checks if user is authenticated and that it had permissions
    
    // set a basic response if request was executed succesfully
    setResponse: (res, answer, statusCode) => {
        res.status(statusCode)
        res.statusMessage = 'OK'
        res.headers = {
            'Content-type': 'application/json'
        }
        res.send(answer)
    }

}
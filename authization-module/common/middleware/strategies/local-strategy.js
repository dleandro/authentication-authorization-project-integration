'use strict'

const
    LocalStrategy = require('passport-local').Strategy,
    passportUtils = require('../../util/passport-utils')

const strategy = new LocalStrategy(
    async function (username, password, done) {
        let user = await passportUtils.findCorrespondingUser(username, password)
        return await passportUtils.isBlackListed(user.id) ? done(null, false, { message: 'User is BlackListed' }) : done(null, user)
    }
)


module.exports = strategy
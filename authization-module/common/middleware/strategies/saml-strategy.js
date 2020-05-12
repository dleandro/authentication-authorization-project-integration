'use strict'

const
    fs = require('fs'),
    path = require('path'),
    passportUtils = require('../../util/passport-utils'),
    SamlStrategy = new (require('passport-saml').Strategy)({

        callbackUrl: 'http://localhost:8082/api/authentications/saml/callback',  //redirect after sucessfull login
        entryPoint: 'https://authentication-node.eu.auth0.com/samlp/gkngnFEKD5tU9H6gaWR0UR7eqolioXaX',
        issuer: 'aa-node-component',
        cert: fs.readFileSync(path.join(__dirname, '../../certificates/authentication-node.pem'), 'utf-8'),
        privateCert: fs.readFileSync(path.join(__dirname, '../../certificates/privateKey.pem'), 'utf-8')


    }, async function (profile, done) {
        let user = await passportUtils.findUserByIdp(profile.nameID)

        if (!user) {
            user = await passportUtils.createUser(profile.nameID, 'saml', profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'], null)
        }

        let blacklisted=await passportUtils.isBlackListed(user.id) 
        if(blacklisted){
            passportUtils.addNotification(user.id)
            done(null, false, { message: 'User is BlackListed' })
            return
        }
        done(null, user)
    })

module.exports = SamlStrategy

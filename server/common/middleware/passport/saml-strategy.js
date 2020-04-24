/*'use strict'

const
fs = require('fs'),
SamlStrategy = new (require('passport-saml').Strategy)({ 
    
    callbackUrl: 'http://localhost:8082/login/callback',  //redirect after sucessfull login
    entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'passport-saml',
    decryptionPvk:fs.readFileSync('./privkey.pem')
  },function(profile, done) {
    findByEmail(profile.email, function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  })

const certificate=fs.readFileSync('./cacert.pem','utf-8')
//console.log(SamlStrategy.generateServiceProviderMetadata(certificate))

module.exports = SamlStrategy */
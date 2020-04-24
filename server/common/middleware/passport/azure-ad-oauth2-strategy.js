'use strict'

const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy,
config=require('../../config/config'),
passportUtils = require('../../util/passport-utils'),
 jwt = require('jsonwebtoken');


const strategy = new AzureAdOAuth2Strategy({
    clientID: config.azureAD.azure_client_id,
    clientSecret: config.azureAD.azure_client_secret,
    callbackURL: config.azureAD.callbackURL,
    tenant: config.azureAD.tenant
  },
  async function (accessToken, refresh_token, params, profile, done) {
    // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
    // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
    var waadProfile =jwt.decode(params.id_token);
    console.log(params)
    console.log(profile)
    console.log(jwt.decode(params.id_token))
    let user=await passportUtils.findUserByIdp(params.id_token)
    if(!user){
        user=await passportUtils.CreateUser(params.id_token,'azureAD',waadProfile.email,null)
        console.log(user)
    }
    done(null,user)
  })

  module.exports = strategy
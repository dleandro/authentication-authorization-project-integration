const
    config = require('../common/config/config'),
    passport = require('passport');
const getIdpOptions = idpProp => Object.keys(config[idpProp]).filter(item=>item!=='callbackUrl');

// this module allows clients to change module configurations (database options, client ids and such)
module.exports = {

    /**
     * change google qauthentication options
     * @param newConfiguration
     */
    changeGoogleAuthenticationOptions: newConfiguration => {
        newConfiguration.google_opts.callbackUrl=config.google.callbackUrl;
        config.google = newConfiguration.google_opts;

        delete passport._strategies.google;

        const strat = require('../common/middleware/authentication-middleware/strategies/google-strategy')();

        passport.use('google', strat);
    },
    /**
     *
     * @param newConfiguration
     */
    changeAzureADAuthenticationOptions: newConfiguration => {
        newConfiguration.azure_opts.callbackUrl=config.azureAD.callbackUrl;
        config.azureAD = newConfiguration.azure_opts;

        delete passport._strategies.azure_ad_oauth2;

        const strat = require('../common/middleware/authentication-middleware/strategies/azure-ad-oauth2-strategy')();

        passport.use('azure_ad_oauth2', strat);
    },

    changeSamlAuthenticationOptions: newConfiguration => {
        newConfiguration.saml_opts.callbackUrl=config.saml.callbackUrl;
        config.saml = newConfiguration.saml_opts;

        delete passport._strategies.saml;

        const strat = require('../common/middleware/authentication-middleware/strategies/saml-strategy')();

        passport.use('saml', strat);
    },

    getRbacOptions: async () => {

        const
            rolesDal = require('./dals/roles-dal'),
            permissionsDal = require('./dals/permissions-dal');

        const roles = (await rolesDal.get()).map(role => role.role);

        const permissions = await permissionsDal.get();
        const resources = [];

        // save unique resources on the array "resources"
        permissions.forEach(permission => !resources.includes(permission.resource) && resources.push(permission.resource));

        // map each permission to its resource and respective array of possible actions
        let formattedPermissions = {};
        resources
            .forEach(resource => formattedPermissions[resource] = permissions
                .filter(permission => permission.resource === resource)
                .map(permission => permission.action));

        let formattedGrants = {};

        await Promise.all(roles
            .map(async role => {
                var grant = await config.rbac.getScope(role);
                formattedGrants[role] = grant;
                return grant;
            }));

        return { roles, permissions: formattedPermissions, grants: formattedGrants };
    },

    getGoogleOptions:async () => getIdpOptions('google'),

    getAzureAdOptions:async () => getIdpOptions('azureAD'),

    getSamlOptions:async () => getIdpOptions('saml'),

};

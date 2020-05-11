'use strict'

const
    config = require('../common/config/config'),
    errors = require('../common/errors/app-errors'),
    apiUtils = require('../common/util/api-utils'),
    listLayer = require('../functionalities/list-dal'),
    permissionLayer = require('../functionalities/permission-dal')

module.exports = {

    hasPermissions: async (req, resp, next) => {

        if (config.env === config.test) {
            return next()
        }

        if (!req.isAuthenticated()) {
            const err = JSON.parse( errors.userNotAuthenticated.message)
            apiUtils.setResponse(resp, err, err.status)
        }


        let userRoles = listLayer.getUserActiveList(req.user.id).map(element => element.role_id)


        if (userRoles.length === 0) {
            const err = JSON.parse(errors.userRoleNotFound.message)
            apiUtils.setResponse(resp, err, err.status)
        }

        let obj = permissionLayer.getPermissionById()
        await dal.permission.getPermissionID(req.method, req.baseUrl)
        if(obj.length === 0) resp.end("Permissions were not defined to this endpoint")
        let roles = await dal.rolesPermission.getRolesByPermission(JSON.parse(obj[0].id)).then(roles=>roles.map(element => element.role))

        if(roles.length === 0) resp.end("There isn't any role associated with the endpoint")
        while(true) {

            if (roles.some(role=>userRoles.includes(role))) return next();
            if (roles.every(element => element === null)) {
                resp.end("Insufficient Permissions")
            }
            roles = await getParents(roles).then(roles=>roles.flat())
        }
    }
};

async function getParents(roles) {
    let parentRoles = []
    await Promise.all(
        roles.map((role) =>
            dal
                .role
                .getRoleById(role)
                .then(parentRole=>parentRole.map(role => role.parent_role))
                .then(parentRole=>parentRoles.push(parentRole))
        )
    )
    return parentRoles
}
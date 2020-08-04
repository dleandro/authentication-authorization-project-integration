'use strict'

const { Role, Permission } = require('../sequelize-model')

const RolePermission = require('../sequelize-model').RolePermission,
    rolesDal = require('./roles-dal'),
    config = require('../../common/config/config'),
    rbac = config.rbac,
    tryCatch = require('../../common/util/functions-utils')

module.exports = {

    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    create: (RoleId, id) =>
        tryCatch(async () => {
                const permission = await require('./permissions-dal').getSpecificById(id)
                rbac.grant(await rbac.getRole((await rolesDal.getSpecificById(RoleId)).role), await rbac.getPermission(permission.action, permission.resource))
                return RolePermission.findOrCreate({
                    where: {
                        RoleId: RoleId,
                        PermissionId: permission.id
                    }
                });
            }),

    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    delete: (roleId, permissionId) =>
        tryCatch(async () =>{
        const permission = await require('./permissions-dal').getSpecificById(permissionId)
        const role = await rolesDal.getSpecificById(roleId)
        await rbac.revokeByName(role.role,permission.action + '_' + permission.resource)
            return RolePermission.destroy({
                where: {
                    RoleId: roleId, PermissionId: permissionId
                }
        })}),

    /**
     *
     * @param permission
     * @returns {Promise<void>}
     */
    getRolesByPermission: (permission) =>
        tryCatch(() =>
            RolePermission.findAll({
                where: {
                    PermissionId: permission
                }
            })
        ),

get:() =>
tryCatch(() =>
    RolePermission.findAll({
        include:[Role,Permission],
        raw:true
    })
)

}


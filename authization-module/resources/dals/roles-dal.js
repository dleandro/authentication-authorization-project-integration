'use strict'

const Role = require('../sequelize-model').Role,
    { Permission, User } = require('../sequelize-model'),
    config = require('../../common/config/config'),
    tryCatch = require('../../common/util/functions-utils')

module.exports = {

    /**
         *
         * @param role
         * @returns {Promise<void>}
         */
    create: (role) =>
        tryCatch(() => {
            config.rbac.createRole(role, true)
            return Role.findOrCreate({
                where: {
                    role: role
                }
            })
        }),

    update: (id, role, parent_role) => tryCatch(() => Role.update({ role: role, parent_role: parent_role }, { where: { id: id } })),

    /**
     *
     * @param roleId
     * @returns {Promise<*>}
     */
    getSpecificById: (roleId) =>
        tryCatch(() => Role.findByPk(roleId)),

    getByName: (roleName) => tryCatch(() => Role.findOne({ where: { role: roleName } })),
    /**
     *
     * @param roleId
     * @returns {Promise<void>}
     */
    delete: (roleId) =>
        tryCatch(() => 
            Role.destroy({
                where: {
                    id: roleId
                }
            })
        ),
    /**
     *
     * @returns {Promise<void>}
     */
    get: () => tryCatch(() => Role.findAll({ raw: true })),

    getRolePermissions: (roleId) => tryCatch(() => Role.findAll({ where: { id: roleId }, include: [Permission], raw: true })),

    getUsersWithThisRole: (roleId) => tryCatch(() => Role.findAll({ where: { id: roleId }, include: [User], raw: true })),

    getPermissionsWithThisRole: (roleId) => tryCatch(() => Role.findAll({ where: { id: roleId }, include: [Permission], raw: true })),

    addParentRole: (role, parentRole) =>
        tryCatch(async () => {
            config.rbac.grant(await config.rbac.getRole(parentRole.role), await config.rbac.getRole(role.role))
            return Role.update({ parent_role: parentRole.id }, { where: { id: role.id } })
        })

}

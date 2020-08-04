const { RBAC } = require('rbac')

module.exports = class AuthizationRbac {

    constructor(rbac_opts) {
        this.rbac_opts = rbac_opts
    }

    init() {
        this.rbac = new RBAC(this.rbac_opts) 

        const rbac_options = this.rbac.options
        if(Array.isArray(rbac_options.roles) && typeof(rbac_options.permissions) === 'object' && typeof(rbac_options.grants) === 'object') {
            return this.rbac.init()
        }
        throw Error("rbac options sent to the constructor were invalid")
    }

    can(roleName, action, resource) {
        return this.rbac.can(roleName, action, resource)
    }

    canAll(roleName, permissions) {
        return this.rbac.canAll(roleName, permissions)
    }

    canAny(roleName, permissions) {
        return this.rbac.canAny(roleName, permissions)
    }

}
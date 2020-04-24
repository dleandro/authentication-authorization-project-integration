'use strict'
const
dalUtils = require('./dal-utils'),
errors = require('../errors/app-errors')

module.exports = {

    user: require('../../user/user-dal')(dalUtils, errors),

    rolesPermission: require('../../roles-permission/role-permission-dal')(dalUtils, errors),

    usersHistory: require('../../user-history/user-history-dal')(dalUtils, errors),

    role: require('../../role/role-dal')(dalUtils, errors),
    
    list: require('../../list/list-dal')(dalUtils, errors),
    
    permission: require('../../permission/permission-dal')(dalUtils, errors),
    
    userRole: require('../../users-roles/user-role-dal')(dalUtils, errors),

    userHistory: require('../../user-history/user-history-dal') (dalUtils, errors)

}
const
    { RBAC } = require('rbac'),
    config = require('./config/config'),
    { User, Role, UserRoles } = require('../resources/sequelize-model'),
    moment = require('moment');
const rolesDal = require('../resources/dals/roles-dal');

var
    roleDal,
    permissionsDal,
    rolesPermissionsDal

module.exports = async function (rbac_opts,bool) {

    if (config.isModuleSetUp) {
        return config.rbac;
    }

    const rbac = new RBAC();
    config.rbac = rbac;

    // variables are only initialized here because they need rbac to be placed on the config file before dal's are called
    roleDal = require('../resources/dals/roles-dal')
    permissionsDal = require('../resources/dals/permissions-dal')
    rolesPermissionsDal = require('../resources/dals/roles-permissions-dal')


   /* const promiseArr = [
        setupSuperuser(),
        createRoles(rbac_opts.roles),
        createPermissions(rbac_opts.permissions)
    ]*/

    const promiseArr2=[
        setupSuperuser(),
        createRbacRoles(),
        createRbacPermissions()
    ]

    // Using promise.all to parallelize queries
    // we need to await this line below because we need 
    //the database to have all roles and permissions values before creating Grants
    await Promise.all(bool?promiseArr:promiseArr2)

    bool?await createGrants(rbac_opts.grants):await createRbacGrants()

    return Promise.resolve(rbac.init())
}

async function setupSuperuser() {
    // server admin should change superuser's password
    // this should use our own dals to make sure rbac object is always consistent with our database
    const superuser = await User.findOrCreate({ where: { "username": "superuser" }, defaults: { "password": "superuser" } })
    const role = Role.findOrCreate({ where: { "role": "admin" } })
    return UserRoles.findOrCreate({
        where: { "UserId": superuser[0].id, "RoleId": (await role)[0].id },
        defaults: { "updater": superuser[0].id, "active": 1, "start_date": moment().format() }
    })
}

function createRoles(roles) {
    return Promise.all(
        roles
            .map(role => roleDal.create(role))
    );
}

function createPermissions(permissions) {
    return Promise.all(
        permissions
            .map(permission => permissionsDal.create(permission.action, permission.resource))
    );
}

function createGrants(grants) {
    return Promise.all(Object.keys(grants).map(async function (key, index) {
        const permissions = grants[key];
        const role = await roleDal.getByName(key);
        return permissions.map(permission => {
            if ('role' in permission) {
                return roleDal.getByName(permission.role).then(childRole => roleDal.addParentRole(childRole, role));
            } else {
                return permissionsDal.getSpecific(permission.action, permission.resource).then(p => rolesPermissionsDal.create(role.id, p.id));
            }
        });
    }));
}

async function createRbacRoles() {
   let roles=await rolesDal.get()
   roles=roles.map(role=>role.role)
   config.rbac.createRoles(roles,true)
}

async function createRbacPermissions() {
    let permissions=await permissionsDal.get()
    permissions.map(permission=>config.rbac.createPermission(permission.action,permission.resource,true))
 }

 async function createRbacGrants() {
     let rolepermissions=await rolesPermissionsDal.get()
     return Promise.all(rolepermissions.map(async rolePermission=>{
         const role=await config.rbac.getRole(rolePermission['Role.role'])
         const permission=await config.rbac.getPermission(rolePermission['Permission.action'],rolePermission['Permission.resource'])
          config.rbac.grant(role,permission)}))
 }

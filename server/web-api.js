'use strict'

const 
apiUtils = require('./common/util/api-utils'), 
data = require('./common/util/dal-paths'),
fs=require('fs'),
auth=require('./common/data/auth')


module.exports = function(app) {
    
    const
    userRouter = require('./user/user-router') (auth,apiUtils, data.user),
    permissionRouter = require('./permission/permission-router') (apiUtils, data.permission),
    roleRouter = require('./role/role-router') (apiUtils, data.role),
    listRouter = require('./list/list-router') (apiUtils, data.list),
    rolesPermissionRouter = require('./roles-permission/roles-permission-router') (apiUtils, data.rolesPermission),
    usersRolesRouter = require('./users-roles/users-roles-router') (apiUtils, data.usersRoles),
    userHistoryRouter = require('./user-history/user-history-router') (apiUtils, data.userHistory),
    authenticationRouter = require('./user/authentication-router') (apiUtils, data.user)
    

    app.use('/user', userRouter)
    app.use('/permission', permissionRouter)
    app.use('/role', roleRouter)
    app.use('/list', listRouter)
    app.use('/roles-permission', rolesPermissionRouter)
    app.use('/users-roles', usersRolesRouter)

    
    //app.post('/saml-login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),(req,res)=>res.redirect('/homepage'))
    app.put('/change-user-status', (req, res) => {
        
    })

    app.post('/config/database',(req,res)=>{
      let obj=req.body
      let config=JSON.parse(fs.readFileSync(__dirname+'/common/config/production.json','utf-8'))
      console.log(config)
      config.database_opts=obj
      console.log(config)
        res.end()
    })

    app.post('/config/google',(req,res)=>{
        let obj=req.body
        let config=JSON.parse(fs.readFileSync(__dirname+'/common/config/production.json','utf-8'))
        console.log(config)
        config.google=obj
        console.log(config)
          res.end()
      })

      app.post('/config/azureAD',(req,res)=>{
        let obj=req.body
        let config=JSON.parse(fs.readFileSync(__dirname+'/common/config/production.json','utf-8'))
        console.log(config)
        config.azureAD=obj
        console.log(config)
          res.end()
      })

    app.use('/user-history', userHistoryRouter)
    app.use('/authentication', authenticationRouter)
    
}
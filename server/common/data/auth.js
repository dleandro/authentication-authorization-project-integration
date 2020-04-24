'use strict'
const dal=require('../util/dal-paths')
module.exports={

    hasPermissions:async (req,resp,next)=>{
        if(!req.isAuthenticated()){
            resp.redirect("/authentication/login")
            resp.end()
    }

    if (config.env !== config.test){
        return next()
    }

    console.log(req.user)
        let userRoles=await dal.userRole.getUserActiveList(req.user.id)
        userRoles=userRoles.map(element=>element.role_id)
        if(userRoles.length==0)resp.end("User does not have roles")
        let obj=await dal.permission.getPermissionID(req.method,req.baseUrl)
        if(obj.length==0)resp.end("Permissions were not defined to this endpoint")
        let roles=await dal.rolesPermission.getRolesByPermission(JSON.parse(obj[0].id))
        roles=roles.map(element=>element.role)
        if(roles.length==0)resp.end("There isn't any role associated with the endpoint")
        while(true){
        for(let i=0;i<roles.length;i++){
            //console.log(userRoles)
            //console.log(roles[i])
            //console.log(userRoles.includes(roles[i]))
            if(userRoles.includes(roles[i]))return next();  
        }
        if(roles.every(element => element === null)){
            resp.end("Insufficient Permissions")
        }
       roles=await getParents(roles)
       roles=roles.flat()
        }
    }
};

async function getParents(roles){
    let parentRoles=[]
   await Promise.all(roles.map(async (role)=>{
    let parentRole=await dal.role.getRoleById(role)
    parentRole=parentRole.map(role=>role.parent_role)
    parentRoles.push(parentRole)
   }))
   return parentRoles
}
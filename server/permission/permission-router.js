'use strict'

// this module contains all permissions related endpoints
module.exports = function(apiUtils, data) {
    
    const permissionRouter = require('express').Router()
    
    permissionRouter.route('/')
    .get(getPermissions)
    .post(addPermission)
    .delete(deletePermission)

    function getPermissions(req, res){
        data.getPermissions()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }

    function addPermission(req,res){
        data.addPermission(req.body.method, req.body.path)
        .then(answer => {
            req.body.id = answer.insertId
            apiUtils.setResponse(res, req.body, 201)
        })
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    function deletePermission(req, res){
        data.deletePermission(req.body.method, req.body.path)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    return permissionRouter
    
}

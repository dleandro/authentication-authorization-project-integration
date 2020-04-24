'use strict'

// this module contains all user's roles related endpoints
module.exports = function(apiUtils, data) {
    
    const usersRolesRouter = require('express').Router()
    
    usersRolesRouter.route('/')
    .post(addUsersRoles)
    .get(getUsersRoles)

    usersRolesRouter.get('/active', getActiveRoles)
    usersRolesRouter.get('/active/user/:id', getUserActiveList)
    usersRolesRouter.get('/active/user', getUserRolesById)    
    
    function addUsersRoles(req, res){
        data.addUserRole(req.body.user, req.body.role)
        .then(answer => apiUtils.setResponse(res, answer, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }

    function getUsersRoles(req,res){
        data.getUserRoles()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }

    function getActiveRoles(req,res){
        data.getActiveRoles()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }

    function getUserActiveList(req,res){
        data.getUserActiveList(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    
    function getUserRolesById(req,res){
        data.getUserRolesById(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    return usersRolesRouter
    
}

'use strict'

// this module contains all role related endpoints
module.exports = function(apiUtils, data) {
    
    const roleRouter = require('express').Router()
    
    roleRouter.route('/')
    .post(addRole)
    .get(getRoles)
    
    roleRouter.route('/:id')
    .delete(deleteRole)
    .get(getRoleById)
    
    function addRole(req, res){
        data.addRole(req.body.role)
        .then(answer => {
            req.body.id = answer.insertId
            apiUtils.setResponse(res, req.body, 201)
        })
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    function deleteRole(req, res){
        data.deleteRole(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    function getRoles(req, res){
        data.getRoles()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    function getRoleById(req, res){
        data.getRoleById(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    return roleRouter
    
}
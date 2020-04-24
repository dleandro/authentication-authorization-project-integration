'use strict'

// this module contains all user related endpoints
module.exports = function(auth,apiUtils, data) {
    
    const userRouter = require('express').Router()
    
    userRouter.route('/')
    .get((req, res) => {
        data.getAllUsers()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    .post((req, res) => {
        data.insertUser(req.body.username, req.body.password)
        .then(answer => {
            req.body.id = answer.insertId
            apiUtils.setResponse(res, req.body, 201)
        })
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })

    userRouter.route('/:id')
    .get(auth.hasPermissions,(req, res) => {
        data.getUserById(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    .delete(auth.hasPermissions, (req, res) => {
        data.deleteUser(req.params.id)
        .then(answer => apiUtils.setResponse(res, "User deleted", 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    userRouter.put('/:id/username', apiUtils.ensureAuthenticated, (req, res) => {
        data.updateUsername(req.body.username, req.params.id)
        .then(answer => apiUtils.setResponse(res, req.body, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    userRouter.put('/:id/password', apiUtils.ensureAuthenticated, (req, res) => {
        data.updatePassword(req.body.password, req.params.id)
        .then(answer => apiUtils.setResponse(res, req.body, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    return userRouter
}
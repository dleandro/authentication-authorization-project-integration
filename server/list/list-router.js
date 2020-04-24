'use strict'

// this module contains all list related endpoints
module.exports = function(apiUtils, data) {
    
    const listRouter = require('express').Router()
    
    listRouter.route('/')
    .get(getLists)
    .post(addList)

    listRouter.delete('/:id', deleteList)

    listRouter.get('/active', getActiveLists)
    listRouter.get('/active/user/:id', getUserActiveList)

    
    function addList(req, res){
        data.addList(req.body.user, req.body.list, req.body.start_date, req.body.end_date,  req.body.updater)
        .then(answer => {
            req.body.id = answer.insertId
            apiUtils.setResponse(res, req.body, 201)
        }) 
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    function deleteList(req,res){
        data.deleteList(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }

    function getLists(req,res){
        data.getLists()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }
    
    function getActiveLists(req,res){
        data.getActiveLists()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }

    function getUserActiveList(req, res){
        data.getUserActiveList(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    }

    
    return listRouter
    
}
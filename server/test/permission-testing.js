'use strict'

const 
app = require('../server'),
request = require('supertest'),
assert = require('assert');

const permission = {
    method: "GET",
    path: "/user/1/username"
}

var id

const getAllPermissions = (cb) => {
    request(app)
        .get('/permission/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 

            cb(err, resp)

        })
}

describe('[PERMISSIONS CRUD TESTING]', function() { 
    
    it('should create a new permission', function(done) {
        
        request(app)
        .post('/permission/')
        .send(permission)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err, resp) => { 
            id = resp.body.id

            assert.equal(resp.body.path, permission.path)

            done()
        })
        
    })
    
    it('should get all permissions', function(done) {
        
        getAllPermissions((err, resp) => {
            assert.equal(resp.body.length > 0, true)

            done()
        })
        
    })
    
    it('should delete a permission', function(done) {
        
        request(app)
        .delete(`/permission/`)
        .send(permission)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => {

            getAllPermissions((err, resp) => {

                assert.equal(resp.body.filter(list => list.id == listId).length == 0, true)

            })

            done()
        
        })
        
    })
    
})
'use strict'

const 
app = require('../server'),
request = require('supertest'),
assert = require('assert');

var 
roleId,
permissionId

const role = {
    role: 'admin',
    parent_role: ''
},
roles_permission = {
    role: roleId,
    permission: permissionId
},
permission = {
    method: "GET",
    path: "/user/1/username"
}


describe('[ROLES PERMISSION CRUD TESTING]', function() { 

    // create a role and a permission so we can associate them in a role_permission
    before(function () {

        request(app)
        .post('/role/')
        .send(role)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            roleId = resp.body.id
        })
           
        request(app)
        .post('/permission/')
        .send(permission)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err, resp) => { 
            permissionId = resp.body.id
        })
    })
    
    it('should create a new roles permission', function(done) {
        
        request(app)
        .post('/roles-permission/')
        .send(roles_permission)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err, resp) => { 
            assert.equal(resp.body.permission, permissionId)

            done()
        })
        
    })
    
    it('should delete a list', function(done) {
        
        request(app)
        .delete(`/roles-permission`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 

            assert(err == null, true)

            done()
        })
        
    })
    
})
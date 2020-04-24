'use strict'

const 
app = require('../server'),
request = require('supertest'),
moment = require('moment'),
assert = require('assert');

const user = {
    username: 'test@test.pt',
    password: '1234'
}

const role = {
    role: 'admin',
    parent_role: ''
}

var id,
userId,
roleId
    
const user_roles = {
        user_id: userId,
        role_id: roleId,
        start_date: moment().format(),
        end_date: moment().format(),
        updater: userId,
        active: 1
    }

describe('[USERS ROLES CRUD TESTING]', function() { 

    // create a user and a role to associate in a user role entry
    before(function() {

        request(app)
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err, resp) => {
            userId = resp.body.id
        })

        request(app)
        .post('/role/')
        .send(role)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            roleId = resp.body.id
        })

    })
    
    it('should create a new user role', function(done) {
        
        request(app)
        .post('/users-roles/')
        .send(user_roles)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            id = resp.body.id

            assert.equal(resp.body.user_id, userId)                
            
            done()

        })
        
    })
    
    it('should get all users roles', function(done) {
        
        request(app)
        .get('/users-roles/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            
            assert.equal(resp.body.length > 0, true)                
            
            done()
        })
        
    })
    
    it('should get active user roles', function(done) {
        
        request(app)
        .get('/users-roles/active')
        .send(list)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => {
            assert.equal(resp.body.length > 0, true)                
            
            done()
        })
        
    })
    
    it('should get user´s active roles', function(done) {
        
        request(app)
        .get(`/users-roles/active/user/${id}`)
        .send(list)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(resp.body.length > 0, true)                
            
            done()
        })
        
    })
    
    it('should delete a user role', function(done) {
        
        request(app)
        .delete(`/users-roles/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => {
            assert(err == null, true)

            done()
        })
        
    })
})
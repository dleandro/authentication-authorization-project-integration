'use strict'

const 
app = require('../server'),
request = require('supertest'),
assert = require('assert');

const user = {
    username: 'test@test.pt',
    password: '1234'
}

const getUser = (id, cb) => {
    
    request(app)
    .get(`/user/${id}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, resp) => { cb(err, resp )})
}

var userId

describe('[USER CRUD TESTING]', function() {

    it('should create test user', function(done) {
        
        request(app)
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end( (err, resp) => {
            userId = resp.body.id
            assert.equal(resp.body.username, user.username)                
            
            done()
        })
        
    })
    
    it('should get all users', function(done) {
        
        request(app)
        .get('/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            
            assert.equal(resp.body.length > 0, true)                
            
            done()
        })
        
    })
    
    it('should get test user', function(done) {
        
        // get created resource
        getUser(userId, (err, resp) => {
            assert.equal(user.username, resp.body.username);
            done()
        })       
    })
    
    
    it('should update test user´s username', function(done) {
        const user = {
            username: 'newUsername'
        }
        
        request(app)
        .put(`/user/${userId}/username`)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(user.username, resp.body.username);
            done()
        })
        
    })
    
    
    
    it('should update test user´s password', function(done) {
        const user = {
            password: 'newPassword'
        }

        request(app)
        .put(`/user/${userId}/password`)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(user.password, resp.body.password);
            done()
        })
    })
    
    it('should delete test user', function(done) {
        
        // should make a get request to confirm the created user doesn't exist anymore
        request(app)
        .delete(`/user/${userId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            getUser(userId, (err, resp) => {
                assert.notEqual(err, null)
                done()            
            }) 
        })
        
    })
    
})
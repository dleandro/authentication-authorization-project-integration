'use strict'

const 
app = require('../server'),
request = require('supertest'),
assert = require('assert');

const role = {
    role: 'admin',
    parent_role: ''
}

var id

const getRole = (cb) => {

    request(app)
    .get(`/role/${id}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, resp) => { 
       cb(err, resp)
    })

}

describe('[ROLE CRUD TESTING]', function() { 
    
    it('should create a new role', function(done) {
        
        request(app)
        .post('/role/')
        .send(role)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            id = resp.body.id

            assert.equal(resp.body.role, role.role)

            done()
        })
        
    })
    
    it('should get all roles', function(done) {
        
        request(app)
        .get('/role/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 
            assert.equal(resp.body.length > 0, true)

            done()
        })
        
    })
    
    it('should get the created role', function(done) {
        
        getRole((err, resp) => {
            
            assert.equal(resp.body.role, role.role)
    
            done()
            
        })
        
    })
    
    it('should delete a role', function(done) {
        
        request(app)
        .delete(`/role/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, resp) => { 

            getRole((err, resp) => {
                assert.equal(err != null, true)
            })

            done()
        })
        
    })
})
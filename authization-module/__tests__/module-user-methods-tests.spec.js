'use strict'

// insert environment variable NODE_ENV = "testing" 
// to make sure you use the correct testing configurations

const
    config = require('../common/config/config'),
    express = require('express'),
    app = express(),
    users = require('../authization')(app, db_options).user

const testUser = {
    username: 'test@test.pt',
    password: TEST
}

// TODO: test authentications as well as idp users

describe("TESTING USER METHODS", () => {

    test("Check User CREATE operations", async done => {
        var wentWrong = false
    
        var user = await users.create(testUser.username, testUser.password)
        
        expect(user).toBe(testUser)

        user = await users.getById()

        user = await users.getByUsername()

        user = await users.get()

        const users = await users.getAll()

        const updatedUser = await users.updateUsername()

        const updatedUser = await users.updateUser()

        delete

        then(data => model.findAll({ raw: true }))
        .then(data => data.filter(obj => containsSubObject(obj, json)))
        .then(data => expect(data.length > 0).toBeTruthy())
        .then(data => model.destroy({ where: json }))
        .then(data => model.findAll({ raw: true }))
        .then(data => data.filter(obj => containsSubObject(obj, json)))
        .then(data => expect(data.length === 0).toBeTruthy());

    });

    test("Check creation, obtaining and elimination of List", async () => {
        const list = {
            list: 'testList',
            start_date: '2020-04-9 02:55:05',
            end_date: '2020-06-9 02:55:05',
            updater: 10,
            active: true
        }
        basicCheckById(list, List)
    });
})

'use strict'

const
    moment = require('moment'),
    SELECT_ALL = "SELECT * FROM Users",
    userHistoryDal = require('../functionalities/user-history-dal'),
    dalUtils = require('../common/util/dal-utils'),
    errors = require('../common/errors/app-errors'),

    getUserById = async (id) => {
        var result

        const query = {
            statement: `${SELECT_ALL} where id= ?`,
            description: "get user by id",
            params: [id]
        }

        try {

            result = await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

        try {

            // if there weren't any users found return with an exception
            dalUtils.throwErrorIfNecessary(
                () => result.length == 0,
                errors.noUsersFound)

        } catch (error) {
            throw error
        }

        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
        }
    }

module.exports = {

    /* Requests the database for a user with given id */
    getUserById,

    getUserbyIDP: async (idp) => {
        const query = {
            statement: `Select * from IDP where idp_id= ?`,
            description: "get user by id",
            params: [idp]
        }

        let result = await dalUtils.executeQuery(query)

        if (result[0] == null) return null

        return await getUserById(result[0].user_id)
    },


    getUserByUsername: async (username) => {

        var result

        const query = {
            statement: `${SELECT_ALL} where username= ?`,
            description: "get user by email",
            params: [username]
        }

        try {

            result = await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }


        try {

            // if there weren't any users found return with an exception
            dalUtils.throwErrorIfNecessary(
                () => result.length < 1,
                errors.noUsersFound)

        } catch (error) {
            throw error
        }

        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
        }
    },

    /* 
    Requests the database to return user's that match username and password parameters
    returns the first user found with such parameters
    */
    getUser: async (username, password) => {
        var result

        const query = {
            statement: `${SELECT_ALL} WHERE username=? AND password=?`,
            description: "get user matching username and password",
            params: [username, password]
        }

        try {
            result = await dalUtils.executeQuery(query)
        } catch (error) {
            throw error
        }

        try {
            // if there weren't any users found return with an exception
            dalUtils.throwErrorIfNecessary(
                () => result.length < 1,
                errors.noUsersFound)

        } catch (error) {
            throw error
        }

        // 0 is a magic number solve that later and it probably shouldn't the first,
        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
        }

    },

    /*
    Requests the database for all existing users
    */
    getAllUsers: async () => {

        var result

        const query = {
            statement: "SELECT * FROM Users",
            description: "get all users on the database",
            params: []
        }

        try {

            result = await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

        try {
            // if there weren't any users found return with an exception
            dalUtils.throwErrorIfNecessary(
                () => result.length < 1,
                errors.noUsersFound)

        } catch (error) {
            throw error
        }

        return result.map(user => {
            return {
                id: user.id,
                username: user.username,
                password: user.password,
            }
        })
    },

    /* 
    Requests the database for a new entry in the table users
    Should throw error if there already exists a user with the same parameters   
    */
    insertUser: async (username, password) => {

        var result

        const query = {
            statement: `INSERT INTO Users(username, password) VALUES (?, ?);`,
            description: 'user creation',
            params: [username, password]
        }

        try {

            result = await dalUtils.executeQuery(query)


        } catch (error) {

            throw error
        }

        try {
            //make sure user creation is registered on the user's history
            await userHistoryDal.addUserHistory(result.insertId, moment().format("YYYY-MM-DD HH:mm:ss"), "User creation")

            return result

        } catch (error) {
            throw error
        }

    },
    insertIDP: async (idp_id, idpname, user_id) => {
        const query = {
            statement: 'Insert into IDP(user_id,idp_id,idpname) values (?,?,?)',
            description: "user's username update",
            params: [user_id, idp_id, idpname]
        }
        try {

            return await dalUtils.executeQuery(query)


        } catch (error) {

            throw error
        }
    },

    // update specific user's username 
    updateUsername: async (username, id) => {

        var result

        const query = {
            statement: 'UPDATE Users SET username = ? WHERE id = ?',
            description: "user's username update",
            params: [username, id]
        }

        try {

            result = await dalUtils.executeQuery(query)

        } catch (err) {

            throw err

        }

        try {

            //make sure username update is registered on the user's history
            await userHistoryDal.addUserHistory(id, moment().format("YYYY-MM-DD HH:mm:ss"), "Username update")

            return result
        } catch (error) {
            throw error
        }

    },

    // update specific user's password 
    updatePassword: async (password, id) => {

        var result

        const query = {
            statement: 'UPDATE Users SET password = ? WHERE id = ?',
            description: "user's password update",
            params: [password, id]
        }

        try {

            result = await dalUtils.executeQuery(query)

        } catch (err) {

            throw err

        }

        try {

            //make sure password update is registered on the user's history
            await userHistoryDal.addUserHistory(id, moment().format("YYYY-MM-DD HH:mm:ss"), "Password update")

            return result

        } catch (error) {
            throw error
        }

    },

    // delete user in the database with given id
    deleteUser: async (userId) => {

        var result

        const query = {
            statement: 'DELETE FROM Users WHERE id = ?',
            description: "user delete",
            params: [userId]
        }

        try {

            result = await dalUtils.executeQuery(query)

            // if there weren't any users found return with an exception
            dalUtils.throwErrorIfNecessary(
                () => result.affectedRows == 0,
                errors.noUsersFound)

        } catch (err) {

            throw err

        }

        try {

            //make sure username update is registered on the user's history
            await userHistoryDal.addUserHistory(userId, moment().format("YYYY-MM-DD HH:mm:ss"), "User deleted")

            return result
        } catch (error) {
            throw error
        }
    }

}

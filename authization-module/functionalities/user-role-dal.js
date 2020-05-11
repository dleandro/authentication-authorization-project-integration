'use strict'

const moment = require('moment'),
    dalUtils = require('../common/util/dal-utils')
module.exports = {




    // database should return duplicate error to throw
    addUserRole: async (user, role, start_date, end_date, updater, active) => {

        var result

        const query = {
            statement: 'INSERT INTO Users_Roles(user,role,start_date,end_date,updater,active) VALUES (?,?,?,?,?,?);',
            description: "adding user_role",
            params: [user, role, start_date, end_date, updater, active]
        }

        try {
            result = await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

    },

    deactivateUserRole: async (id) => {

        const query = {
            statement: 'UPDATE Users_Roles SET active = 0 WHERE id = ?',
            description: 'deactivate user_role´s status',
            params: [id]
        }

        try {

            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

    },

    getActiveRoles: async () => {

        const query = {
            statement: `Select * from User_Roles where active=1 AND end_date>'${moment().format()}'`,
            description: "getting active roles",
            params: []
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }


    },

    getUserActiveRoles: async (id) => {
        const query = {
            statement: `Select * from Users_Roles where user_id=? AND active=1 AND (end_date>'${moment().format('YYYY-MM-DD HH:MM:SS')}' || end_date IS NULL)`,
            description: "getting user's active roles",
            params: [id]
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }


    },

    getUserRoles: async () => {

        const query = {
            statement: `Select * from User_Roles`,
            description: "getting all user roles",
            params: []
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

    },

    getUserRolesById: async (id) => {

        const query = {
            statement: 'Select * from User_Roles where user_id=?',
            description: "getting all user's roles",
            params: [id]
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }


    }


}